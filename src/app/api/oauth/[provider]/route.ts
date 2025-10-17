import { getOAuthClient } from '@/authentification/providers/base'
import createUserSession from '@/authentification/actions/createUserSession'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { z } from 'zod'
import { oAuthProviders, oAuthProvidersType } from '@/authentification/const'
import { db } from '@/db/postgres'

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
    const user = (
        await db.query(`SELECT id FROM users WHERE email = $1`, [email])
    ).rows[0]

    if (!user) {
        const newUser = await db.query(
            `INSERT INTO users (username, email, picture) VALUES ($1, $2, $3) RETURNING id`,
            [name, email, picture],
        )
        await db.query(
            `INSERT INTO oauth_accounts (provider, provider_account_id, user_id) VALUES ($1, $2, $3)`,
            [provider, id, newUser.rows[0].id],
        )

        return newUser.rows[0].id as string
    }

    return user.rows[0].id as string
}
