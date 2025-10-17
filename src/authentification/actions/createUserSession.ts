'use server'

import { db } from '@/db'
import { UserSessionTable, UserTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

export default async function createUserSession(userId: string) {
    try {
        const user = await db.query.UserTable.findFirst({
            where: eq(UserTable.id, userId),
        })

        if (!user?.id) throw new Error('User not found')

        const [session] = await db
            .insert(UserSessionTable)
            .values({
                userId: user.id,
            })
            .returning({ id: UserSessionTable.id })

        if (!session) throw new Error('Session undefined')

        const cookieStore = await cookies()
        cookieStore.set('SESSION_ID_COOKIE', session.id, {
            secure: true,
            httpOnly: true,
            sameSite: 'lax',
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        })
    } catch (e) {
        console.error(e)
    }
}
