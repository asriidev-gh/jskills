import { MongoClient, type Db } from "mongodb";

const uri = process.env.DATABASE_URL;
const options = {};

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
