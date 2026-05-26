import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-[12rem] font-black leading-none text-white/5">
        404
      </span>
      <h1 className="-mt-16 font-display text-4xl font-black uppercase text-white">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-white/50">
        Looks like this play went out of bounds. Head back to the court.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </section>
  );
}
