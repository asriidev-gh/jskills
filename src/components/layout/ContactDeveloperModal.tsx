"use client";

import { useState } from "react";
import { Code2, Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactDeveloperButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact-developer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          contact: formData.get("contact"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setSuccess(false);
      setError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-xs text-white/50 hover:text-accent-orange"
        >
          <Code2 className="h-3.5 w-3.5" />
          Contact Developer
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md border border-white/10 bg-court-darker p-0 sm:max-w-lg">
        <div className="p-6 sm:p-8">
          <DialogTitle className="font-display text-xl font-bold uppercase text-white">
            Contact Developer
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-white/50">
            Website feedback, updates, or technical support. Your message goes directly to
            the developer.
          </DialogDescription>

          {success ? (
            <div className="mt-6 rounded-xl border border-accent-orange/30 bg-accent-orange/10 p-6 text-center">
              <p className="font-semibold text-accent-orange">Message sent!</p>
              <p className="mt-2 text-sm text-white/60">
                Thank you — the developer will get back to you soon.
              </p>
              <Button className="mt-6" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="dev-name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
                  Name *
                </label>
                <Input
                  id="dev-name"
                  name="name"
                  placeholder="Your name"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="dev-email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
                  Email *
                </label>
                <Input
                  id="dev-email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="dev-contact" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
                  Contact *
                </label>
                <Input
                  id="dev-contact"
                  name="contact"
                  placeholder="Phone or alternate contact"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="dev-message" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
                  Message *
                </label>
                <Textarea
                  id="dev-message"
                  name="message"
                  placeholder="How can we help?"
                  rows={4}
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
