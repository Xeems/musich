'use client'

import signUp from '@/actions/signUp'
import getUserBySession from '@/actions/getUserBySession'
import signIn from '@/actions/signIn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import React, { useState } from 'react'
import logout from '@/actions/logout'

export default function Auth() {
    const [username, setUsername] = useState('')

    const handleCreate = async () => {
        await signUp(username)
    }

    const handleLogin = async () => {
        await signIn(username)
        const user = await getUserBySession()
        console.log(user)
    }

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className="flex w-full items-center justify-center">
            <div className="flex w-1/3 flex-col items-center gap-2">
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button onClick={handleCreate}>Создать акаунт</Button>
                <Button onClick={handleLogin}>Войти в акаунт</Button>
                <Button onClick={handleLogout}>Выйти</Button>
            </div>
        </div>
    )
}
