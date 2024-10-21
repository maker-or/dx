
import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `gallery_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    userId: varchar("userId", { length: 1024 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    url: varchar("url", { length: 1024 }).notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const tasks = createTable(
  "tasks",
  {
    taskId: serial("taskId").primaryKey(),           // Auto-incrementing task_id
    userId: varchar("userId", { length: 1024 }).notNull(),  // ID of the user who created the task
    task: varchar("task", { length: 255 }).notNull(),        // Task description or title
    date: varchar("date").notNull(),                           // Date when the task is created or due
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),                                           // Timestamp for task creation
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),                                     // Timestamp for task updates
    ),
  },
  (tasks) => ({
    userIndex: index("user_idx").on(tasks.userId),          // Index on userId for faster lookups
  })
);

