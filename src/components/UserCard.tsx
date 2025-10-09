import getUserBySession from '@/authentification/actions/getUserBySession'
import AuthLinks from './AuthLinks'
import UserInfo from './UserInfo'

export default async function UserCard() {
    const user = await getUserBySession()
    return <div>{user ? <UserInfo user={user} /> : <AuthLinks />}</div>
}
