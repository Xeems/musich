'use server'

import { db } from '@/db'
import { UserSessionTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

export default async function getUserBySession() {
    try {
        const cookieStore = await cookies()
        const sessionId = cookieStore.get('COOKIE_SESSION')?.value
        if (!sessionId) return null

        const session = await db.query.UserSessionTable.findFirst({
            where: eq(UserSessionTable.id, sessionId),
            with: {
                user: true,
            },
        })

        if (!session) return null

        const ttl = 1000 * 60 * 60 * 24 * 7
        const expired = session.createdAt.getTime() + ttl < Date.now()

        if (expired || session.isEnded) {
            await db
                .update(UserSessionTable)
                .set({ isEnded: true, endedAt: new Date() })
                .where(eq(UserSessionTable.id, sessionId))
            return null
        }

        return session.user
    } catch (e) {
        console.log(e)
    }
}
