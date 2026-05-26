export type PreloadAsset = {
  url: string;
  type: "image" | "video";
  weight: number;
};

export const HOME_PRELOAD_ASSETS: PreloadAsset[] = [
  { url: "/videos/edmar_hero_banner.mp4", type: "video", weight: 65 },
  { url: "/images/training_in_action/events/events_1.jpg", type: "image", weight: 12 },
  { url: "/images/jskills_logo.png", type: "image", weight: 8 },
  { url: "/images/coach_edmar.png", type: "image", weight: 15 },
];

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
}

function preloadVideo(
  url: string,
  onBufferProgress: (ratio: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;

    const reportBuffer = () => {
      if (!video.duration || !Number.isFinite(video.duration)) return;
      if (video.buffered.length === 0) return;
      const end = video.buffered.end(video.buffered.length - 1);
      onBufferProgress(Math.min(1, end / video.duration));
    };

    video.addEventListener("progress", reportBuffer);
    video.addEventListener("loadedmetadata", reportBuffer);
    video.addEventListener(
      "canplaythrough",
      () => {
        onBufferProgress(1);
        resolve();
      },
      { once: true }
    );
    video.addEventListener(
      "error",
      () => reject(new Error(`Failed to load video: ${url}`)),
      { once: true }
    );

    video.src = url;
    video.load();
  });
}

const PRELOAD_TIMEOUT_MS = 30_000;
const MIN_LOADER_MS = 600;

export async function preloadHomeAssets(
  onProgress: (percent: number) => void
): Promise<void> {
  const totalWeight = HOME_PRELOAD_ASSETS.reduce((sum, a) => sum + a.weight, 0);
  const assetProgress = new Map<string, number>();

  const emitProgress = () => {
    let weighted = 0;
    for (const asset of HOME_PRELOAD_ASSETS) {
      weighted += (assetProgress.get(asset.url) ?? 0) * asset.weight;
    }
    onProgress(Math.min(100, Math.round((weighted / totalWeight) * 100)));
  };

  for (const asset of HOME_PRELOAD_ASSETS) {
    assetProgress.set(asset.url, 0);
  }
  emitProgress();

  const preloadAll = Promise.all(
    HOME_PRELOAD_ASSETS.map(async (asset) => {
      if (asset.type === "image") {
        await preloadImage(asset.url);
        assetProgress.set(asset.url, 1);
        emitProgress();
        return;
      }

      await preloadVideo(asset.url, (ratio) => {
        assetProgress.set(asset.url, ratio);
        emitProgress();
      });
      assetProgress.set(asset.url, 1);
      emitProgress();
    })
  );

  const timeout = new Promise<void>((resolve) => {
    setTimeout(resolve, PRELOAD_TIMEOUT_MS);
  });

  const minDisplay = new Promise<void>((resolve) => {
    setTimeout(resolve, MIN_LOADER_MS);
  });

  try {
    await Promise.all([Promise.race([preloadAll, timeout]), minDisplay]);
  } catch {
    // Still reveal the page if an asset fails
  }

  onProgress(100);
}
