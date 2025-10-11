import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@/db/schema'

declare global {
    var __db__: ReturnType<typeof drizzle> | undefined
    var __sql__: ReturnType<typeof postgres> | undefined
}

if (!global.__sql__) {
    global.__sql__ = postgres(process.env.DATABASE_URL!, {
        max: 1,
    })
}

if (!global.__db__) {
    global.__db__ = drizzle(global.__sql__!, { schema })
}

export const db = global.__db__!
