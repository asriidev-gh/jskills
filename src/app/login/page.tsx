"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Logo } from "@/components/shared/Logo";
import { DASHBOARD_LOGO } from "@/lib/site";

const swalTheme = {
  confirmButtonColor: "#ff6b35",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/dashboard/insights");
      router.refresh();
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Login failed",
        text: err instanceof Error ? err.message : "Please try again.",
        ...swalTheme,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-court-dark px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo href="/" size="md" src={DASHBOARD_LOGO} />
          <h1 className="mt-6 font-display text-3xl font-black uppercase text-white">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Sign in to view enrollments and insights
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-court-card/80 p-6 backdrop-blur-xl"
        >
          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-orange"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent-orange"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent-orange py-3 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
