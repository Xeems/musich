'use server'

import { db } from '@/db'
import { UserSessionTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

export default async function SignOut() {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('SESSION_ID_COOKIE')?.value
    if (!sessionId) return null

    const [endedSession] = await db
        .update(UserSessionTable)
        .set({
            isEnded: true,
            endedAt: new Date(),
        })
        .where(eq(UserSessionTable.id, sessionId))
        .returning()

    if (endedSession.isEnded === true) {
        cookieStore.delete('SESSION_ID_COOKIE')
    }
}
