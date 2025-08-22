'use server'

import { db } from '@/db'
import { UserSessionTable } from '@/db/schema'
import { cookies } from 'next/headers'

type UserForSessionType = {
    userId: string
}

export async function createUserSession(data: UserForSessionType) {
    const [session] = await db
        .insert(UserSessionTable)
        .values({
            userId: data.userId,
        })
        .returning({ id: UserSessionTable.id })

    if (!session) return 'Session undefined'

    const cookieStore = await cookies()
    cookieStore.set('COOKIE_SESSION', session.id, {
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    })
}
