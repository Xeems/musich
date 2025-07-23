import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const trackTable = pgTable('tracks', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    author: varchar({ length: 225 }).notNull(),
    imageName: varchar({ length: 225 }),
    fileName: varchar({ length: 222 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
})
