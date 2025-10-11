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
    { href: '/search', name: 'Search' },
]

export default function MainNav() {
    const pathname = usePathname()

    return (
        <nav className="flex w-full flex-col items-start justify-center gap-x-4 gap-y-2 md:w-fit md:flex-row md:items-center">
            {navLinks.map((link) => (
                <Link
                    href={link.href}
                    key={link.href}
                    className={cn(
                        `w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 md:w-fit`,
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
