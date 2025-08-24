'use client'

import createUser from '@/actions/createUser'
import getUserBySession from '@/actions/getUserBySession'
import signUp from '@/actions/signUp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import React, { useState } from 'react'

export default function Auth() {
    const [username, setUsername] = useState('')

    const handleCreate = async () => {
        await createUser(username)
    }

    const handleLogin = async () => {
        await signUp(username)
        const user = await getUserBySession()
        console.log(user)
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
            </div>
        </div>
    )
}
