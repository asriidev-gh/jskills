"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  getOneOnOnePackages,
  getProgramPackages,
  getPackageById,
  getPackagePriceLabel,
  packages,
} from "@/lib/clinic-data";
import { formatPHP } from "@/lib/utils";
import Image from "next/image";
import { CreditCard, Smartphone, Banknote, Upload, X } from "lucide-react";
import {
  ENROLL_PACKAGE_EVENT,
  ENROLL_SECTION_ID,
  getPackageIdFromUrl,
} from "@/lib/enroll-navigation";
import { PAYMENTS_REQUIRING_PROOF } from "@/lib/payment-proof";

const paymentMethods = [
  { id: "paymaya", label: "PayMaya", icon: Smartphone },
  { id: "bpi", label: "BPI Bank Transfer", icon: CreditCard },
  { id: "cash", label: "Cash", icon: Banknote },
];

const paymentQrImages: Record<string, string> = {
  bpi: "/images/payment/bpi.png",
  paymaya: "/images/payment/paymaya.jpg",
};

const allPackages = [
  ...getOneOnOnePackages(),
  ...getProgramPackages().filter((p) => p.price > 0 || p.id === "group-monthly"),
];

const swalTheme = {
  background: "#0a0a0f",
  color: "#ffffff",
  confirmButtonColor: "#ff6b35",
};

export function EnrollmentForm() {
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("paymaya");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [paymentScreenshotPreview, setPaymentScreenshotPreview] = useState<string | null>(
    null
  );
  const previewUrlRef = useRef<string | null>(null);

  const revokePreviewUrl = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }, []);

  const selectPaymentScreenshot = useCallback(
    (file: File | null) => {
      revokePreviewUrl();

      if (file) {
        const url = URL.createObjectURL(file);
        previewUrlRef.current = url;
        setPaymentScreenshot(file);
        setPaymentScreenshotPreview(url);
        return;
      }

      setPaymentScreenshot(null);
      setPaymentScreenshotPreview(null);
    },
    [revokePreviewUrl]
  );

  const clearPaymentScreenshot = useCallback(() => {
    selectPaymentScreenshot(null);
  }, [selectPaymentScreenshot]);

  const requiresPaymentProof = PAYMENTS_REQUIRING_PROOF.has(payment);
  const canSubmit = !requiresPaymentProof || paymentScreenshot !== null;

  const selectedPackage = selectedPackageId
    ? getPackageById(selectedPackageId)
    : undefined;

  const applyPackageFromUrl = useCallback(() => {
    const packageId = getPackageIdFromUrl();
    if (packageId && allPackages.some((p) => p.id === packageId)) {
      setSelectedPackageId(packageId);
    }
  }, []);

  useEffect(() => {
    applyPackageFromUrl();

    const onPackageSelect = (event: Event) => {
      const { packageId } = (event as CustomEvent<{ packageId: string }>).detail;
      if (allPackages.some((p) => p.id === packageId)) {
        setSelectedPackageId(packageId);
      }
    };

    window.addEventListener(ENROLL_PACKAGE_EVENT, onPackageSelect);
    window.addEventListener("popstate", applyPackageFromUrl);

    if (window.location.hash === `#${ENROLL_SECTION_ID}` && getPackageIdFromUrl()) {
      requestAnimationFrame(() => {
        document.getElementById(ENROLL_SECTION_ID)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    return () => {
      window.removeEventListener(ENROLL_PACKAGE_EVENT, onPackageSelect);
      window.removeEventListener("popstate", applyPackageFromUrl);
    };
  }, [applyPackageFromUrl]);

  useEffect(() => () => revokePreviewUrl(), [revokePreviewUrl]);

  const handlePaymentChange = (methodId: string) => {
    setPayment(methodId);
    if (!PAYMENTS_REQUIRING_PROOF.has(methodId)) {
      clearPaymentScreenshot();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("payment", payment);

    if (requiresPaymentProof) {
      if (!paymentScreenshot) {
        await Swal.fire({
          icon: "warning",
          title: "Payment Screenshot Required",
          text: "Please upload a screenshot of your payment before submitting.",
          confirmButtonText: "OK",
          ...swalTheme,
        });
        setLoading(false);
        return;
      }

      formData.set("paymentProof", paymentScreenshot);
    }

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enrollment. Please try again.");
      }

      form.reset();
      setPayment("paymaya");
      setSelectedPackageId("");
      clearPaymentScreenshot();

      const url = new URL(window.location.href);
      url.searchParams.delete("package");
      url.hash = "";
      window.history.replaceState(null, "", url.pathname + url.search);

      await Swal.fire({
        icon: "success",
        title: "Enrollment Received!",
        html: `
          <p style="margin:0 0 12px;line-height:1.6;color:rgba(255,255,255,0.75)">
            Thank you! Your enrollment has been submitted successfully.
            Coach Edmar will contact you within <strong>24 hours</strong> to confirm
            your schedule and payment details.
          </p>
          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.5)">
            Urgent inquiries: <a href="tel:+639272731688" style="color:#ff6b35">0927 273 1688</a>
          </p>
        `,
        confirmButtonText: "Great!",
        ...swalTheme,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: message,
        confirmButtonText: "Try Again",
        ...swalTheme,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6 md:p-8">
        <CardTitle className="mb-2 text-xl">Enrollment Form</CardTitle>
        <p className="mb-6 text-sm text-white/50">
          Fill out the form below. Session 1 includes evaluation, assessment, and
          program planning.
        </p>

        {selectedPackage && (
          <div className="mb-6 rounded-xl border border-accent-orange/30 bg-accent-orange/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-white/40">
              Selected package
            </p>
            <p className="mt-1 font-display text-xl font-bold text-white">
              {selectedPackage.name}
            </p>
            <p className="mt-1 font-display text-2xl font-black text-accent-orange">
              {getPackagePriceLabel(selectedPackage)}
            </p>
            {selectedPackage.sessions > 0 && (
              <p className="mt-2 text-sm text-white/50">
                {selectedPackage.sessions} session
                {selectedPackage.sessions > 1 ? "s" : ""}
                {selectedPackage.validity && ` · ${selectedPackage.validity}`}
                {selectedPackage.period && ` · ${selectedPackage.period}`}
              </p>
            )}
            {selectedPackage.description && (
              <p className="mt-2 text-sm text-white/60">{selectedPackage.description}</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Player full name *"
            required
            disabled={loading}
            aria-label="Name"
          />
          <Input
            name="age"
            type="number"
            min={5}
            max={50}
            placeholder="Age *"
            required
            disabled={loading}
            aria-label="Age"
            onInput={(e) => {
              const input = e.currentTarget;
              if (input.value.length > 2) {
                input.value = input.value.slice(0, 2);
              }
              if (input.value && Number(input.value) > 50) {
                input.value = "50";
              }
            }}
          />
          <Input
            name="contact"
            placeholder="Parent / client contact number *"
            required
            disabled={loading}
            aria-label="Contact"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email *"
            required
            disabled={loading}
            aria-label="Email"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
                Skill Level *
              </label>
              <Select
                name="skillLevel"
                required
                disabled={loading}
                aria-label="Skill level"
                defaultValue=""
              >
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
              <Select
                name="position"
                required
                disabled={loading}
                aria-label="Position"
                defaultValue=""
              >
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
            <Select
              name="package"
              required
              disabled={loading}
              aria-label="Package"
              value={selectedPackageId}
              onChange={(e) => setSelectedPackageId(e.target.value)}
            >
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
            disabled={loading}
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
                  disabled={loading}
                  onClick={() => handlePaymentChange(method.id)}
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
            {paymentQrImages[payment] && (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/40">
                  Scan to pay
                </p>
                <Image
                  src={paymentQrImages[payment]}
                  alt={`${payment === "bpi" ? "BPI" : "PayMaya"} payment QR code`}
                  width={240}
                  height={240}
                  className="mx-auto rounded-lg"
                />
              </div>
            )}
            {requiresPaymentProof && (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-white/40">
                  Payment Screenshot *
                </label>
                <p className="mb-3 text-sm text-white/50">
                  Upload a screenshot of your {payment === "bpi" ? "BPI transfer" : "PayMaya"}{" "}
                  payment before submitting.
                </p>
                {!paymentScreenshot ? (
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-8 text-center transition-colors hover:border-accent-orange/50 hover:bg-white/5">
                    <Upload className="h-6 w-6 text-white/40" />
                    <span className="text-sm text-white/70">Click to upload screenshot</span>
                    <span className="text-xs text-white/40">JPG, PNG, or WebP up to 5MB</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      disabled={loading}
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        selectPaymentScreenshot(file);
                        e.target.value = "";
                      }}
                    />
                  </label>
                ) : (
                  <div className="space-y-3">
                    {paymentScreenshotPreview && (
                      <div className="relative overflow-hidden rounded-lg border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={paymentScreenshotPreview}
                          alt="Payment screenshot preview"
                          className="mx-auto max-h-64 w-full object-contain bg-black/20"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                      <p className="truncate text-sm text-white/70">{paymentScreenshot.name}</p>
                      <button
                        type="button"
                        disabled={loading}
                        onClick={clearPaymentScreenshot}
                        className="inline-flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white"
                      >
                        <X className="h-3.5 w-3.5" />
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/40">
            <strong className="text-white/60">Refund policy:</strong> Strictly no refunds.
            Packages must be consumed within validity period. Sessions are transferable.
          </p>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading || !canSubmit}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Enrollment"
            )}
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
