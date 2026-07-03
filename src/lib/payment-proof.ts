export const PAYMENTS_REQUIRING_PROOF = new Set(["paymaya", "bpi"]);

export const PAYMENT_PROOF_MAX_BYTES = 5 * 1024 * 1024;

export const PAYMENT_PROOF_ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export interface PaymentProofRecord {
  contentType: string;
  filename: string;
  data: Buffer;
}

export function validatePaymentProofFile(
  file: File | null | undefined
): string | null {
  if (!file || !(file instanceof File) || file.size === 0) {
    return "Please upload a payment screenshot.";
  }

  if (!PAYMENT_PROOF_ALLOWED_TYPES.has(file.type)) {
    return "Please upload a JPG, PNG, or WebP image.";
  }

  if (file.size > PAYMENT_PROOF_MAX_BYTES) {
    return "Payment screenshot must be 5MB or smaller.";
  }

  return null;
}

export async function paymentProofFromFile(
  file: File
): Promise<PaymentProofRecord> {
  const bytes = Buffer.from(await file.arrayBuffer());

  return {
    contentType: file.type,
    filename: file.name,
    data: bytes,
  };
}
