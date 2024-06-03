DROP TABLE IF EXISTS "fight_tracker_fight_cards"

CREATE TABLE IF NOT EXISTS "fight_tracker_fight_cards" (
	"fight_id" serial PRIMARY KEY NOT NULL,
	"event_name" varchar(255) NOT NULL,
	"fighter1_name" varchar(255) NOT NULL,
	"fighter2_name" varchar(255) NOT NULL,
	"fight_date" date NOT NULL,
	"weight_class" varchar(255),
	"outcome" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fight_tracker_user_selections" (
	"selection_id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(256) NOT NULL,
	"fight_id" integer NOT NULL,
	"selected_winner" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_name_idx" ON "fight_tracker_fight_cards" ("event_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "fight_tracker_user_selections" ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "fight_id_idx" ON "fight_tracker_user_selections" ("fight_id");