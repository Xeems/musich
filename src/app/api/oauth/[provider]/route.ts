import { getOAuthClient } from '@/authentification/providers/base'
import createUserSession from '@/authentification/actions/createUserSession'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { oAuthProviders, oAuthProvidersType } from '@/authentification/const'
import { db } from '@/db'
import { OAuthAccountTable, UserTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

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
        const userid = await connectUserToAccount(oAuthUser, provider)
        await createUserSession(userid)
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

async function connectUserToAccount(
    {
        id,
        email,
        name,
        picture,
    }: { id: string; email: string; name: string; picture: string },
    provider: oAuthProvidersType,
) {
    const user = await db.query.UserTable.findFirst({
        where: eq(UserTable.email, email),
    })

    if (!user?.id) {
        const newUser = await db
            .insert(UserTable)
            .values({
                email: email,
                username: name,
                picture: picture,
            })
            .returning({ id: UserTable.id })

        const oauth_account = await db
            .insert(OAuthAccountTable)
            .values({
                userId: newUser[0].id,
                provider: provider,
                providerAccountId: id,
            })
            .returning()

        if (!oauth_account) throw new Error('oAuth connection undefined')

        return newUser[0].id
    }

    return user.id
}
