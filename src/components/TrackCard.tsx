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

export default function TrackCard({ track }: { track: TrackType }) {
    return (
        <Card className="hover:bg-primary/10 flex flex-row justify-center border-none bg-transparent p-4 shadow-none">
            <div className="flex">
                <Image
                    src={`/api/images/${track.imageName}`}
                    width={32}
                    height={32}
                    alt=""
                    className="h-14 max-h-14 w-14 max-w-14"
                />
            </div>

            <CardHeader className="w-full p-0">
                <CardTitle>{track.name}</CardTitle>
                <CardDescription>{track.author}</CardDescription>
            </CardHeader>
            <CardContent>{track.duration}</CardContent>
        </Card>
    )
}
