'use server'

import { db } from '@/db'
import { UserSessionTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

export default async function getUserBySession() {
    console.log('first')
    try {
        const cookieStore = await cookies()
        const sessionId = cookieStore.get('COOKIE_SESSION')?.value

        if (!sessionId) throw new Error('Seesion not found')

        const session = await db.query.UserSessionTable.findFirst({
            where: eq(UserSessionTable.id, sessionId),
            with: {
                user: true,
            },
        })

        if (!session?.user) throw new Error('User not found')

        return session.user
    } catch (e) {
        console.log(e)
    }
}
