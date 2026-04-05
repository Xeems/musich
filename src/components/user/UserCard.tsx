'use client'
import AuthLinks from '../visual/AuthLinks'
import UserInfo from './UserInfo'
import useSession from '@/hooks/useSession'

export default function UserCard() {
    const session = useSession()
    return <div>{session ? <UserInfo user={session} /> : <AuthLinks />}</div>
}
