'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

export async function createUser(username: string) {
    const res = await fetch('/api/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })

    if (!res.ok) {
        throw new Error('Ошибка при создании пользователя')
    }

    return res.json()
}

export async function getUser(username: string) {
    const res = await fetch(`/api/user/${encodeURIComponent(username)}/`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error('Ошибка при получении пользователя')
    }

    return res.json()
}

export default function Auth() {
    const [username, setUsername] = useState('')

    const handleCreate = async () => {
        try {
            const user = await createUser(username)
            console.log('Создан пользователь:', user)
        } catch (err) {
            console.error(err)
        }
    }

    const handleLogin = async () => {
        try {
            const user = await getUser(username)
            console.log('Найден пользователь:', user)
        } catch (err) {
            console.error(err)
        }
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
