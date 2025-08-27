import React from 'react'

import getUserBySession from '@/actions/getUserBySession'

export default async function UserInfoCard() {
    const user = await getUserBySession()
    if (!user) return <></>
    return <div>{user.name}</div>
}
