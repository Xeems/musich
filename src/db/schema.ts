import { relations } from 'drizzle-orm'
import {
    boolean,
    pgEnum,
    pgTable,
    real,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'

export const TrackTable = pgTable('track_table', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    author: varchar({ length: 225 }).notNull(),
    imageName: varchar({ length: 225 }),
    trackDir: varchar({ length: 222 }).notNull(),
    duration: real().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
})

export const UserTable = pgTable('user_table', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
})

export const UserSessionTable = pgTable('user_session_table', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    userId: uuid()
        .notNull()
        .references(() => UserTable.id),
    isEnded: boolean().default(false).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    endedAt: timestamp(),
})

export const PlaylistTypeEnum = pgEnum('playlist_type_enum', [
    'default',
    'custom',
])

export const PlaylistTable = pgTable('playlist_table', {
    id: uuid('id').primaryKey().unique().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    imageName: varchar({ length: 225 }),
    type: PlaylistTypeEnum(),
    creatorId: uuid()
        .notNull()
        .references(() => UserTable.id),
})

export const PlaylistTrackTable = pgTable('playlist_tracks_table', {
    playlistId: uuid()
        .notNull()
        .references(() => PlaylistTable.id),
    trackId: uuid()
        .notNull()
        .references(() => TrackTable.id),
})

// RELATIONS

export const TrackRelations = relations(TrackTable, ({ many }) => ({
    playlistTracks: many(PlaylistTrackTable),
}))

export const PlaylistRelations = relations(PlaylistTable, ({ many }) => ({
    playlistTracks: many(PlaylistTrackTable),
}))

export const PlaylistTrackRelations = relations(
    PlaylistTrackTable,
    ({ one }) => ({
        playlist: one(PlaylistTable, {
            fields: [PlaylistTrackTable.playlistId],
            references: [PlaylistTable.id],
        }),
        track: one(TrackTable, {
            fields: [PlaylistTrackTable.trackId],
            references: [TrackTable.id],
        }),
    }),
)

export const UserRelations = relations(UserTable, ({ many }) => ({
    playLists: many(PlaylistTable),
    sessions: many(UserSessionTable),
}))

export const UserSessionRelations = relations(UserSessionTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [UserSessionTable.userId],
        references: [UserTable.id],
    }),
}))
