'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchBar() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const [term, setTerm] = useState(searchParams.get('q') || '')

    const handleSearch = (value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set('q', value)
        } else {
            params.delete('q')
        }
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <search>
            <div className="relative w-full">
                <Input
                    placeholder="Search for tracks"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            handleSearch(term)
                        }
                    }}
                />
                <button
                    onClick={() => handleSearch(term)}
                    className="text-muted-foreground absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center">
                    <SearchIcon
                        className="cursor-pointer"
                        strokeWidth={1.5}
                        onClick={() => handleSearch(term)}
                    />
                </button>
            </div>
        </search>
    )
}
