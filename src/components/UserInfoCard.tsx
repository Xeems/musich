import React from 'react'
import { Card } from './ui/card'
import getUserBySession from '@/actions/getUserBySession'

export default async function UserInfoCard() {
    const user = await getUserBySession()
    if (!user) return <></>
    return <Card>{user.name}</Card>
}
