import { integer, pgTable, varchar, text, uuid, timestamp  } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    credits: integer()
})

export const SessionChatTable = pgTable("session_chats", {
  sessionId: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  therapistId: text("therapist_id"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
