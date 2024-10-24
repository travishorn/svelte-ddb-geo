import { Database } from "duckdb-async";

export const db = await Database.create("local.ddb");

await db.exec("INSTALL spatial; LOAD spatial;");
