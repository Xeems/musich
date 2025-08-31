'use server'

import { oAuthProvidersType } from '@/authentification/consts'
import { getOAuthClient } from '../providers/base'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function signInOAuth(provider: oAuthProvidersType) {
    const oAuthClient = getOAuthClient(provider)
    redirect(oAuthClient.createAuthUrl(await cookies()))
}
