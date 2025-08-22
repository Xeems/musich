'use client'

import createUser from '@/actions/createUser'
import signUp from '@/actions/signUp'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

// export async function createUser(username: string) {
//     const res = await fetch('/api/user/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username }),
//     })

//     if (!res.ok) {
//         throw new Error('Ошибка при создании пользователя')
//     }

//     return res.json()
// }

// export async function getUser(username: string) {
//     const res = await fetch(`/api/user/${encodeURIComponent(username)}/`, {
//         method: 'GET',
//     })

//     if (!res.ok) {
//         throw new Error('Ошибка при получении пользователя')
//     }

//     return res.json()
// }

export default function Auth() {
    const [username, setUsername] = useState('')

    const handleCreate = async () => {
        const data = await createUser(username)
        console.log(data)
    }

    const handleLogin = async () => {
        await signUp(username)
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
