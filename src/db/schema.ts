import { relations } from 'drizzle-orm'
import {
    pgEnum,
    pgTable,
    real,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'

export const tracks = pgTable('track_table', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    author: varchar({ length: 225 }).notNull(),
    imageName: varchar({ length: 225 }),
    trackDir: varchar({ length: 222 }).notNull(),
    duration: real().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
})

export const users = pgTable('user_table', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
})

export const playlistTypeEnum = pgEnum('playlist_type_enum', [
    'default',
    'custom',
])

export const playLists = pgTable('playlist_table', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    imageName: varchar({ length: 225 }),
    type: playlistTypeEnum(),
    creatorId: uuid()
        .notNull()
        .references(() => users.id),
})

export const playlistTracks = pgTable('playlist_tracks_table', {
    playlistId: uuid()
        .notNull()
        .references(() => playLists.id),
    trackId: uuid()
        .notNull()
        .references(() => tracks.id),
})

// RELATIONS

export const tracksRelations = relations(tracks, ({ many }) => ({
    playlistTracks: many(playlistTracks),
}))

export const playListsRelations = relations(playLists, ({ many }) => ({
    playlistTracks: many(playlistTracks),
}))

export const playlistTracksRelations = relations(playlistTracks, ({ one }) => ({
    playlist: one(playLists, {
        fields: [playlistTracks.playlistId],
        references: [playLists.id],
    }),
    track: one(tracks, {
        fields: [playlistTracks.trackId],
        references: [tracks.id],
    }),
}))

export const usersRelations = relations(users, ({ many }) => ({
    playLists: many(playLists),
}))
