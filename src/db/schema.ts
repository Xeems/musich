import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const trackTable = pgTable('tracks', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    author: varchar({ length: 225 }).notNull(),
    imagePath: varchar({ length: 225 }),
    filePath: varchar({ length: 222 }).notNull(),
})
