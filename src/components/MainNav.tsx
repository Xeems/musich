'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type LinkType = {
    href: string
    name: string
}

const navLinks: LinkType[] = [
    { href: '/', name: 'Main Page' },
    { href: '/tracks', name: 'My tracks' },
    { href: '/Search', name: 'Search' },
]

export default function MainNav() {
    const pathname = usePathname()

    return (
        <div className="flex flex-row items-center justify-between gap-x-4">
            {navLinks.map((link) => (
                <Link
                    href={link.href}
                    key={link.href}
                    className={
                        pathname.includes(link.href) ? 'bg-amber-400' : ''
                    }>
                    {link.name}
                </Link>
            ))}
        </div>
    )
}
