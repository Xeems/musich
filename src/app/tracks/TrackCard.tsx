import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import React from 'react'
import { TrackType } from '../../../@types/track'
import Image from 'next/image'

export default function TrackCard({ track }: { track: TrackType }) {
    return (
        <Card className="flex flex-row justify-center rounded-none p-1">
            <Image
                src={`/api/images/${track.imageName}`}
                width={32}
                height={32}
                alt=""
            />
            <CardHeader className="w-full p-0">
                <CardTitle>{track.name}</CardTitle>
                <CardDescription>{track.author}</CardDescription>
            </CardHeader>
        </Card>
    )
}
