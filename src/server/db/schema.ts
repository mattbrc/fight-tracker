// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  date,
  integer,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `fight_tracker_${name}`);

// export const images = createTable(
//   "image",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }).notNull(),
//     url: varchar("url", { length: 1024 }).notNull(),
//     userId: varchar("userId", { length: 256 }).notNull(),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt", { withTimezone: true }),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

export const fightCards = createTable(
  "fight_cards",
  {
    fightId: serial("fight_id").primaryKey(),
    eventName: varchar("event_name", { length: 255 }).notNull(),
    fighter1Name: varchar("fighter1_name", { length: 255 }).notNull(),
    fighter2Name: varchar("fighter2_name", { length: 255 }).notNull(),
    fightDate: date("fight_date").notNull(),
    weightClass: varchar("weight_class", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (fightCards) => ({
    eventNameIndex: index("event_name_idx").on(fightCards.eventName),
  })
);

export const userSelections = createTable(
  "user_selections",
  {
    selectionId: serial("selection_id").primaryKey(),
    userId: varchar("userId", { length: 256 }).notNull(),
    fightId: integer("fight_id").notNull(),
    selectedWinner: varchar("selected_winner", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (userSelections) => ({
    userIdIndex: index("user_id_idx").on(userSelections.userId),
    fightIdIndex: index("fight_id_idx").on(userSelections.fightId),
  })
);