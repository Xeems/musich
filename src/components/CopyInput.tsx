'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CopyIcon, CheckIcon } from 'lucide-react'

type Props = {
    value: string
}

export function CopyInput({ value }: Props) {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)

        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <div className="flex items-center gap-2">
            <Input value={value} readOnly className="flex-1" />

            <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleCopy}
                aria-label="Copy">
                {copied ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                    <CopyIcon className="h-4 w-4" />
                )}
            </Button>
        </div>
    )
}
