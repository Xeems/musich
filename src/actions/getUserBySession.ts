'use server'

import { db } from '@/db'
import { UserSessionTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { MinimalUserType } from '../../@types/user'

export default async function getUserBySession(): Promise<
    MinimalUserType | undefined
> {
    try {
        const cookieStore = await cookies()
        const sessionId = cookieStore.get('COOKIE_SESSION')?.value
        if (!sessionId) return undefined

        const session = await db.query.UserSessionTable.findFirst({
            where: eq(UserSessionTable.id, sessionId),
            with: {
                user: true,
            },
        })

        if (!session) return undefined

        const ttl = 1000 * 60 * 60 * 24 * 7
        const expired = session.createdAt.getTime() + ttl < Date.now()

        if (expired || session.isEnded) {
            await db
                .update(UserSessionTable)
                .set({ isEnded: true, endedAt: new Date() })
                .where(eq(UserSessionTable.id, sessionId))
            return undefined
        }

        return session.user
    } catch (e) {
        console.log(e)
        return undefined
    }
}
