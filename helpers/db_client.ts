import {
    Bson,
    MongoClient,
    Database
  } from "https://deno.land/x/mongo@v0.31.0/mod.ts";

let db : Database;

export async function connect() {
  const client = new MongoClient();

  // Connect using srv url
  await client.connect(
      "mongodb+srv://abhi:hunter123@cluster0.pbbtxll.mongodb.net/deno?authMechanism=SCRAM-SHA-1",
    );
  db = client.database('deno-todo');
}



export function getDb () {
  return db;
}