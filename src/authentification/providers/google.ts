import z from 'zod'
import { OAuthClient } from './base'

export default function createGoogleOAuthClient() {
    return new OAuthClient({
        provider: 'google',
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
        scopes: [
            'openid',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
        urls: {
            auth: 'https://accounts.google.com/o/oauth2/v2/auth',
            token: 'https://oauth2.googleapis.com/token',
            user: 'https://openidconnect.googleapis.com/v1/userinfo',
        },
        userInfo: {
            schema: z.object({
                sub: z.string(),
                name: z.string(),
                email: z.email(),
                picture: z.url().optional(),
            }),
            parser: (user) => ({
                id: user.sub,
                name: user.name,
                email: user.email,
                picture: user.picture,
            }),
        },
    })
}
