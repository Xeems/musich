import { cn } from '@/lib/utils'
import { Music4Icon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
    imageName: string | undefined | null
    size?: keyof typeof sizeClasses
}

const sizeClasses = {
    small: 'h-11 w-11',
    medium: 'h-14 w-14',
    large: 'h-36 w-36',
    full: 'size-full max-w-64',
} as const

export default function TrackCover({ imageName, size = 'medium' }: Props) {
    const [hasError, setHasError] = useState(false)

    return (
        <div
            className={cn(
                'relative aspect-square h-16 w-16',
                sizeClasses[size],
            )}>
            {imageName && !hasError ? (
                <Image
                    src={`/api/images/${imageName}`}
                    alt={imageName}
                    fill
                    sizes="full"
                    className="rounded-sm object-cover"
                    quality={75}
                    onError={() => setHasError(true)}
                />
            ) : (
                <div className="bg- bg-muted flex h-full w-full items-center justify-center rounded-sm border">
                    <Music4Icon className="text-muted-foreground" />
                </div>
            )}
        </div>
    )
}
