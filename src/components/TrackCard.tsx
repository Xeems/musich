'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import React from 'react'
import { TrackType } from '../../@types/track'
import Image from 'next/image'
import { milSecToMins } from '@/lib/utils'

type Props = {
    track: TrackType
    onClick: () => void
}

export default function TrackCard({ track, onClick }: Props) {
    return (
        <Card
            tabIndex={0}
            onClick={() => onClick()}
            className="hover:bg-primary/10 focus:bg-primary/10 flex flex-row justify-center border-none bg-transparent px-4 py-2 shadow-none">
            <div className="relative aspect-square h-16 w-16">
                <Image
                    src={`/api/images/${track.imageName}`}
                    alt=""
                    fill
                    className="rounded-sm object-cover"
                    quality={75}
                />
            </div>

            <CardHeader className="text-md flex w-full flex-col items-start justify-center gap-1 px-0">
                <CardTitle>{track.name}</CardTitle>
                <CardDescription>{track.author}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-center">
                {milSecToMins(track.duration)}
            </CardContent>
        </Card>
    )
}
