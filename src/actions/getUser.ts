import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export default async function getUser(username: string) {
    try {
        const data = await db.query.users.findFirst({
            where: eq(users.name, username),
        })

        return data
    } catch (e) {
        console.log(e)
        return undefined
    }
}
