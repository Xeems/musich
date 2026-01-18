import { cn } from '@/lib/utils'
import { Music4Icon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
    imageName: string | undefined | null
    size?: keyof typeof sizeClasses
    quality?: number
}

const sizeClasses = {
    small: 'size-11',
    medium: 'size-14',
    large: 'size-36',
    full: 'size-full max-w-72 max-h-72',
} as const

export default function TrackCover({
    imageName,
    size = 'medium',
    quality = 75,
}: Props) {
    const [hasError, setHasError] = useState(false)

    return (
        <div className={cn('relative aspect-square', sizeClasses[size])}>
            {imageName && !hasError ? (
                <Image
                    src={`/api/images/${imageName}`}
                    alt={imageName}
                    fill
                    sizes="full"
                    className="aspect-square rounded-sm object-cover"
                    loading="eager"
                    quality={quality}
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
