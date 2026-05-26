export const ENROLL_SECTION_ID = "enroll";
export const ENROLL_PACKAGE_EVENT = "jskills:enroll-package";

export function scrollToEnrollment(packageId: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("package", packageId);
  url.hash = ENROLL_SECTION_ID;
  window.history.pushState(null, "", url.toString());

  window.dispatchEvent(
    new CustomEvent(ENROLL_PACKAGE_EVENT, { detail: { packageId } })
  );

  requestAnimationFrame(() => {
    document.getElementById(ENROLL_SECTION_ID)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

export function getPackageIdFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("package");
}
