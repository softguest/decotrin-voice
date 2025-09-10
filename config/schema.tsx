import { integer, pgTable, json, varchar, text, uuid, timestamp  } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    credits: integer()
})

export const SessionChatTable = pgTable("sessionChatTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar().notNull(),
  notes: text(),
  selectedTherapist: json(),
  conversation:json(),
  report:json(),
  createdBy:varchar().references(()=>usersTable.email),
  createdOn: varchar(),
});
