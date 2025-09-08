'use client'

import React, { useEffect, useState } from 'react'

import getUserBySession from '@/actions/getUserBySession'
import SignOut from '@/authentification/actions/signOut'
import { MinimalUserType } from '../../@types/user'
import Link from 'next/link'
import { LogInIcon, UserPlusIcon } from 'lucide-react'

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
                        href="/auth/signin"
                        className="from-primary/85 to-primary/95 hover:from-primary/90 hover:to-primary flex flex-row items-center justify-between gap-x-2 rounded-md bg-gradient-to-r px-3 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl">
                        <LogInIcon className="size-4" />
                        Sign In
                    </Link>
                    <Link
                        href="/auth/signup"
                        className="hover:text-primary flex flex-row items-center justify-between gap-x-2 font-semibold transition-all duration-200 hover:bg-orange-50">
                        <UserPlusIcon className="size-4" /> Sign Up
                    </Link>
                </div>
            )}
        </div>
    )
}
