'use client'

import React, { useEffect, useState } from 'react'

import getUserBySession from '@/actions/getUserBySession'
import SignOut from '@/actions/SignOut'
import { MinimalUserType } from '../../@types/user'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'

export default function UserInfoCard() {
    const [user, setUser] = useState<MinimalUserType | null>(null)

    useEffect(() => {
        getUserBySession().then((user) => {
            setUser(user ?? null)
        })
    }, [])
    return (
        <div>
            {user ? (
                <button onClick={() => SignOut()}>
                    <p>{user.name}</p>
                </button>
            ) : (
                <div className="flex flex-row items-center justify-between gap-x-4">
                    <Link
                        href="/auth/SignIn"
                        className="flex flex-row items-center justify-between gap-x-2 rounded-md bg-gradient-to-r from-orange-400 to-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-orange-500 hover:to-orange-600 hover:shadow-xl">
                        <LogInIcon className="size-4" />
                        Sign In
                    </Link>
                    <Link href="/auth/SignUp">Sign Up</Link>
                </div>
            )}
        </div>
    )
}
