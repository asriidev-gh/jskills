"use client";

import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getOneOnOnePackages, getProgramPackages, packages } from "@/lib/clinic-data";
import { formatPHP } from "@/lib/utils";
import { CreditCard, Smartphone, Banknote } from "lucide-react";

const paymentMethods = [
  { id: "gcash", label: "GCash", icon: Smartphone },
  { id: "bpi", label: "BPI Bank Transfer", icon: CreditCard },
  { id: "cash", label: "Cash", icon: Banknote },
];

const allPackages = [...getOneOnOnePackages(), ...getProgramPackages().filter((p) => p.price > 0 || p.id === "group-monthly")];

export function EnrollmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [payment, setPayment] = useState("gcash");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="border-accent-orange/30">
        <CardContent className="p-8 text-center">
          <CardTitle className="text-2xl text-accent-orange">Enrollment Received!</CardTitle>
          <p className="mt-4 text-white/60">
            Thank you! Coach Edmar will contact you within 24 hours to confirm your
            schedule and payment details.
          </p>
          <p className="mt-2 text-sm text-white/40">
            For urgent inquiries, call{" "}
            <a href="tel:+639272731688" className="text-accent-orange">
              0927 273 1688
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        <CardTitle className="mb-2 text-xl">Enrollment Form</CardTitle>
        <p className="mb-6 text-sm text-white/50">
          Fill out the form below. Session 1 includes evaluation, assessment, and
          program planning.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Player full name *" required aria-label="Name" />
          <Input
            name="age"
            type="number"
            min={5}
            max={99}
            placeholder="Age *"
            required
            aria-label="Age"
          />
          <Input
            name="contact"
            placeholder="Parent / client contact number *"
            required
            aria-label="Contact"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email (optional)"
            aria-label="Email"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
                Skill Level *
              </label>
              <Select name="skillLevel" required aria-label="Skill level" defaultValue="">
                <option value="" disabled>
                  Select level
                </option>
                <option value="beginner">A. Beginner</option>
                <option value="intermediate">B. Intermediate</option>
                <option value="advance">C. Advance</option>
              </Select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
                Position *
              </label>
              <Select name="position" required aria-label="Position" defaultValue="">
                <option value="" disabled>
                  Select position
                </option>
                <option value="PG">Point Guard (PG)</option>
                <option value="SG">Shooting Guard (SG)</option>
                <option value="SF">Small Forward (SF)</option>
                <option value="PF">Power Forward (PF)</option>
                <option value="C">Center (C)</option>
                <option value="not-sure">Not sure yet</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
              Package *
            </label>
            <Select name="package" required aria-label="Package" defaultValue="">
              <option value="" disabled>
                Select package
              </option>
              {allPackages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                  {pkg.price > 0 ? ` — ${formatPHP(pkg.price)}` : ` — ${pkg.priceLabel}`}
                </option>
              ))}
            </Select>
          </div>

          <Textarea
            name="notes"
            placeholder="Goals, injuries, or questions (optional)"
            rows={3}
            aria-label="Notes"
          />

          <div>
            <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-white/40">
              Payment Method *
            </label>
            <div className="grid gap-2 sm:grid-cols-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPayment(method.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition-all ${
                    payment === method.id
                      ? "border-accent-orange bg-accent-orange/10 text-accent-orange"
                      : "border-white/10 text-white/60 hover:border-white/20"
                  }`}
                >
                  <method.icon className="h-4 w-4" />
                  {method.label}
                </button>
              ))}
            </div>
            <input type="hidden" name="payment" value={payment} />
          </div>

          <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/40">
            <strong className="text-white/60">Refund policy:</strong> Strictly no refunds.
            Packages must be consumed within validity period. Sessions are transferable.
          </p>

          <Button type="submit" className="w-full" size="lg">
            Submit Enrollment
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap gap-2">
          {packages
            .filter((p) => p.type === "1-on-1")
            .map((p) => (
              <Badge key={p.id} variant="outline" className="text-xs">
                {p.name}: {formatPHP(p.price)}
              </Badge>
            ))}
          <Badge variant="outline" className="text-xs">
            Group: ₱3,900/mo
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
