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
  paymentProof?: {
    contentType: string;
    filename: string;
    data: Buffer;
  };
}

const COLLECTION = "users";

let enrollmentIndexesEnsured = false;

async function ensureEnrollmentIndexes() {
  if (enrollmentIndexesEnsured) return;

  const db = await getDatabase();
  const collection = db.collection(COLLECTION);
  const indexes = await collection.indexes();
  const emailIndex = indexes.find((index) => index.name === "email_1");

  if (emailIndex?.unique) {
    await collection.dropIndex("email_1");
  }

  enrollmentIndexesEnsured = true;
}

export async function saveEnrollment(
  record: EnrollmentRecord
): Promise<string> {
  await ensureEnrollmentIndexes();

  const db = await getDatabase();
  const result = await db.collection(COLLECTION).insertOne({
    ...record,
    createdAt: new Date(),
  });

  return result.insertedId.toString();
}
