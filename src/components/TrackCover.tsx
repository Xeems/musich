import { cn } from '@/lib/utils'
import Image from 'next/image'

type Props = {
    imageName: string | null
    size?: 'small' | 'medium' | 'large'
}

const sizeClasses = {
    small: 'h-12 w-12',
    medium: 'h-16 w-16',
    large: 'h-24 w-24',
}

export default function TrackCover({ imageName, size = 'medium' }: Props) {
    return (
        <div
            className={cn(
                'relative aspect-square h-16 w-16',
                sizeClasses[size],
            )}>
            <Image
                src={`/api/images/${imageName}`}
                alt={imageName}
                fill
                className="rounded-sm object-cover"
                quality={75}
            />
        </div>
    )
}
