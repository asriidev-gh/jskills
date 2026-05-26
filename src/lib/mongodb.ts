import dns from "node:dns";
import { MongoClient, type Db } from "mongodb";

// Fixes querySrv ECONNREFUSED / EREFUSED on some macOS and local DNS setups
dns.setDefaultResultOrder("ipv4first");

const uri = process.env.DATABASE_URL;

const options = {
  serverSelectionTimeoutMS: 10_000,
  connectTimeoutMS: 10_000,
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("Please add DATABASE_URL to your .env file");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  const client = new MongoClient(uri, options);
  return client.connect();
}

export const MONGODB_DB_NAME = "jskills";

export async function getDatabase(): Promise<Db> {
  const mongoClient = await getClientPromise();
  return mongoClient.db(MONGODB_DB_NAME);
}

export function getMongoConnectionHelp(error: unknown): string | null {
  const message = error instanceof Error ? error.message : String(error);
  const isSrvDnsFailure =
    message.includes("querySrv") &&
    (message.includes("ECONNREFUSED") || message.includes("EREFUSED") || message.includes("ETIMEOUT"));

  if (!isSrvDnsFailure) return null;

  return (
    "Cannot reach MongoDB (DNS SRV lookup failed). In Atlas → Connect → Drivers, " +
    'copy the "standard connection string" (starts with mongodb://, not mongodb+srv://) ' +
    "into DATABASE_URL in .env, then restart the dev server. Or switch your Mac DNS to 8.8.8.8 / 1.1.1.1."
  );
}
