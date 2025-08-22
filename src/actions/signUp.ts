'use server'

import { db } from '@/db'
import { UserTable } from '@/db/schema'
import { createUserSession } from '@/lib/session'
import { eq } from 'drizzle-orm'

export default async function signUp(username: string) {
    try {
        const user = await db.query.UserTable.findFirst({
            where: eq(UserTable.name, username),
        })

        if (!user?.id) throw new Error('User not found')

        createUserSession({ userId: user?.id })
    } catch (e) {
        console.log(e)
        return undefined
    }
}
