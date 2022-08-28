import { config } from "https://deno.land/x/dotenv/mod.ts";
import {
    Bson,
    MongoClient,
    Database
  } from "https://deno.land/x/mongo@v0.31.0/mod.ts";

let db : Database;

export async function connect() {
  const client = new MongoClient();

  // Connect using srv url
  await client.connect(config().MOGO_URI);
  db = client.database('deno-todo');
}



export function getDb () {
  return db;
}