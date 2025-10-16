import { getOAuthClient } from '@/authentification/providers/base'
import createUserSession from '@/authentification/actions/createUserSession'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { db } from '@/db'
import { oAuthProviders, oAuthProvidersType } from '@/authentification/const'
import { OAuthAccountTable, PlaylistTable, UserTable } from '@/db/schema'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ provider: string }> },
) {
    const { provider: rawProvider } = await params
    const code = request.nextUrl.searchParams.get('code')
    const state = request.nextUrl.searchParams.get('state')
    const provider = z.enum(oAuthProviders).parse(rawProvider)

    if (typeof code !== 'string' || typeof state !== 'string') {
        redirect(
            `/sign-in?oauthError=${encodeURIComponent(
                'Failed to connect. Please try again.',
            )}`,
        )
    }

    const oAuthClient = getOAuthClient(provider)
    try {
        const oAuthUser = await oAuthClient.fetchUser(
            code,
            state,
            await cookies(),
        )
        const user = await connectUserToAccount(oAuthUser, provider)
        await createUserSession(user.id)
    } catch (error) {
        console.error(error)
        redirect(
            `/sign-in?oauthError=${encodeURIComponent(
                'Failed to connect. Please try again.',
            )}`,
        )
    }

    redirect('/')
}

function connectUserToAccount(
    { id, email, name }: { id: string; email: string; name: string },
    provider: oAuthProvidersType,
) {
    return db.transaction(async (trx) => {
        let [user] = await trx
            .select({ id: UserTable.id })
            .from(UserTable)
            .where(eq(UserTable.email, email))
            .limit(1)

        if (user == null) {
            const [newUser] = await trx
                .insert(UserTable)
                .values({
                    username: name,
                    email: email,
                })
                .returning()
            user = newUser

            await trx.insert(PlaylistTable).values({
                creatorId: newUser.id,
                name: `${newUser.username}'s tracks`,
                type: 'default',
            })
        }

        await trx
            .insert(OAuthAccountTable)
            .values({
                provider,
                providerAccountId: id,
                userId: user.id,
            })
            .onConflictDoNothing()

        return user
    })
}
