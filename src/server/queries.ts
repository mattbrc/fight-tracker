import "server-only"
import { db } from "./db"
import { auth } from "@clerk/nextjs/server";
import { and, eq, sql } from "drizzle-orm";
import { fightCards, userSelections } from "./db/schema";

export async function getUserPicksCount() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");
  
  const totalCount = await db
  .select({ count: sql<number>`count(*)` })
  .from(userSelections)
  .where(eq(userSelections.userId, user.userId));

  return totalCount.map(row => ({ count: Number(row.count) }))
}

export async function getUserWinsCount() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const winsCount = await db
    .select({ count: sql<number>`count(*)` })
    .from(userSelections)
    .innerJoin(fightCards, eq(userSelections.fightId, fightCards.fightId))
    .where(
      and(
        eq(userSelections.userId, user.userId),
        eq(userSelections.selectedWinner, fightCards.outcome)
      ))
    // .where(eq(userSelections.userId, user.userId))
    // .where(eq(userSelections.selectedWinner, fightCards.outcome));

  return winsCount.map(row => ({ count: Number(row.count) }));
}

export async function getUserWinPercentage() {
  const userPicksCount = await getUserPicksCount();
  const userWinsCount = await getUserWinsCount();

  const totalPicks = userPicksCount[0]?.count ?? 0;
  const totalWins = userWinsCount[0]?.count ?? 0;

  const winPercentage = totalPicks > 0 ? (totalWins / totalPicks) * 100 : 0;

  return winPercentage;
}
