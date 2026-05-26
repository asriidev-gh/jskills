import { getDatabase } from "@/lib/mongodb";

export interface EnrollmentRecord {
  name: string;
  age: string;
  contact: string;
  email: string;
  skillLevel: string;
  skillLevelRaw: string;
  position: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  packagePriceLabel: string;
  payment: string;
  paymentRaw: string;
  notes: string;
  submittedAt: Date;
}

const COLLECTION = "users";

export async function saveEnrollment(
  record: EnrollmentRecord
): Promise<string> {
  const db = await getDatabase();
  const result = await db.collection(COLLECTION).insertOne({
    ...record,
    createdAt: new Date(),
  });

  return result.insertedId.toString();
}
