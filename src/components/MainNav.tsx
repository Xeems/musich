'use client'

import { cn } from '@/lib/utils'
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
        <nav className="flex flex-row items-center justify-between gap-x-4">
            {navLinks.map((link) => (
                <Link
                    href={link.href}
                    key={link.href}
                    className={cn(
                        `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200`,
                        pathname === link.href
                            ? 'bg-gradient-to-r from-orange-100 to-orange-200 font-semibold text-orange-700 shadow-sm'
                            : 'hover:text-primary',
                    )}>
                    {link.name}
                </Link>
            ))}
        </nav>
    )
}
