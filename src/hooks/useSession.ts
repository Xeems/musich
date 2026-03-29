import getUserBySession from '@/authentification/actions/getUserBySession'
import { useEffect, useState } from 'react'
import { MinimalUserType } from '../../@types/user'

export default function useSession() {
    const [session, setSession] = useState<null | MinimalUserType>(null)

    useEffect(() => {
        ;(async () => {
            const sessionData = await getUserBySession()
            if (sessionData) setSession(sessionData)
        })()
    }, [])

    return session
}
