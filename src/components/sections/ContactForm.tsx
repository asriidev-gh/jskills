"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="flex min-h-[400px] items-center justify-center">
        <CardContent className="text-center p-8">
          <CardTitle className="text-2xl text-accent-orange">Message Sent!</CardTitle>
          <p className="mt-4 text-white/60">
            Thanks for reaching out. Our team will get back to you within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-8">
        <CardTitle className="mb-6 text-xl">Send us a message</CardTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="First name" required aria-label="First name" />
            <Input placeholder="Last name" required aria-label="Last name" />
          </div>
          <Input type="email" placeholder="Email address" required aria-label="Email" />
          <Input placeholder="Subject" required aria-label="Subject" />
          <Textarea placeholder="Your message..." required aria-label="Message" rows={5} />
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
