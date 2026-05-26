import { cn } from "@/lib/utils";
import type { ShopProductType } from "@/types";

interface ShopProductVisualProps {
  type: ShopProductType;
  className?: string;
}

export function ShopProductVisual({ type, className }: ShopProductVisualProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-court-darker via-[#141420] to-court-dark p-8",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-orange/10 blur-2xl" />

      {type === "jersey" && <JerseyMockup />}
      {type === "shorts" && <ShortsMockup />}
      {type === "socks" && <SocksMockup />}
      {type === "headband" && <HeadbandMockup />}

      <span className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-orange">
        JSkills
      </span>
    </div>
  );
}

function JerseyMockup() {
  return (
    <div className="relative z-10 w-36 drop-shadow-2xl sm:w-44">
      <div className="relative rounded-t-2xl bg-gradient-to-b from-accent-orange to-accent-red px-2 pb-1 pt-3 shadow-glow">
        <div className="mx-auto mb-2 h-8 w-8 rounded-full border-2 border-white/30 bg-court-dark/40" />
        <div className="absolute left-2 top-10 h-16 w-5 rounded-full bg-gradient-to-b from-accent-orange to-[#c44d28]" />
        <div className="absolute right-2 top-10 h-16 w-5 rounded-full bg-gradient-to-b from-accent-orange to-[#c44d28]" />
        <div className="mx-auto flex h-20 w-full flex-col items-center justify-center rounded-b-md bg-gradient-to-b from-accent-red to-[#b83828]">
          <span className="font-display text-4xl font-black text-white">23</span>
          <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
            JSkills
          </span>
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-white/40">
        Dark / Light
      </p>
    </div>
  );
}

function ShortsMockup() {
  return (
    <div className="relative z-10 w-40 drop-shadow-2xl sm:w-48">
      <div className="flex justify-center gap-1">
        <div className="h-24 w-16 rounded-b-3xl rounded-t-lg bg-gradient-to-b from-court-dark to-[#1a1a28] border border-white/10">
          <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-accent-orange/60" />
          <div className="mx-auto mt-6 h-8 w-10 rounded-b-2xl bg-accent-orange/20" />
        </div>
        <div className="h-24 w-16 rounded-b-3xl rounded-t-lg bg-gradient-to-b from-court-dark to-[#1a1a28] border border-white/10">
          <div className="mx-auto mt-2 h-1 w-8 rounded-full bg-accent-orange/60" />
          <div className="mx-auto mt-6 h-8 w-10 rounded-b-2xl bg-accent-orange/20" />
        </div>
      </div>
      <div className="mx-auto -mt-1 h-3 w-28 rounded-full bg-accent-orange/80" />
      <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-white/40">
        Mesh Training
      </p>
    </div>
  );
}

function SocksMockup() {
  return (
    <div className="relative z-10 flex items-end justify-center gap-4 drop-shadow-2xl">
      <div className="flex flex-col items-center">
        <div className="h-14 w-10 rounded-t-2xl bg-gradient-to-b from-white to-gray-200" />
        <div className="h-16 w-11 rounded-b-2xl bg-gradient-to-b from-accent-orange to-accent-red">
          <div className="mx-auto mt-3 h-1 w-6 rounded-full bg-white/30" />
        </div>
      </div>
      <div className="mb-2 flex flex-col items-center">
        <div className="h-14 w-10 rounded-t-2xl bg-gradient-to-b from-white to-gray-200" />
        <div className="h-16 w-11 rounded-b-2xl bg-gradient-to-b from-court-dark to-[#1a1a28] border border-accent-orange/40">
          <div className="mx-auto mt-3 h-1 w-6 rounded-full bg-accent-orange/50" />
        </div>
      </div>
      <p className="absolute -bottom-6 left-1/2 w-full -translate-x-1/2 text-center text-[10px] uppercase tracking-widest text-white/40">
        2-Pack
      </p>
    </div>
  );
}

function HeadbandMockup() {
  return (
    <div className="relative z-10 drop-shadow-2xl">
      <div className="relative mx-auto h-28 w-28 rounded-full bg-gradient-to-b from-[#2a2218] to-[#1a1510] border border-white/10">
        <div className="absolute inset-x-4 top-7 h-7 rounded-full bg-gradient-to-r from-accent-orange via-accent-red to-accent-orange shadow-glow" />
        <div className="absolute inset-x-6 top-8 h-5 rounded-full bg-accent-orange/30 blur-sm" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-white/20">
          JS
        </div>
      </div>
      <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-white/40">
        Sweat-Wicking
      </p>
    </div>
  );
}
