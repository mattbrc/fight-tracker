import "server-only"
import { db } from "./db"
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { userSelections } from "./db/schema";

export async function getUserPicksCount() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");
  
  const totalCount = await db
  .select({ count: sql<number>`count(*)` })
  .from(userSelections)
  .where(eq(userSelections.userId, user.userId));

  return totalCount.map(row => ({ count: Number(row.count) }))
}