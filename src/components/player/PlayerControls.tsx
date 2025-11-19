import React from 'react'
import { Button } from '../ui/button'
import {
    PauseIcon,
    PlayIcon,
    SkipBackIcon,
    SkipForwardIcon,
} from 'lucide-react'
import { useTrackQueue } from '@/hooks/player/useTrackQueue'
import { TrackType } from '../../../@types/track'
import { usePlayerStore } from '@/store/playerStore'

type Props = {
    track: TrackType | null
}

export default function PlayerControls({ track }: Props) {
    const audioRef = usePlayerStore((s) => s.audioRef)
    const togglePlay = usePlayerStore((s) => s.togglePlay)
    const isPlaying = usePlayerStore((s) => s.isPlaying)
    const { playNext, playPrev } = useTrackQueue(audioRef)

    return (
        <div className="flex flex-row items-center justify-center gap-x-2">
            <Button
                onClick={playPrev}
                variant="ghost"
                className="h-8 w-8 rounded-full p-0">
                <SkipBackIcon />
            </Button>
            <Button
                disabled={!track}
                onClick={togglePlay}
                className="flex h-10 w-10 items-center justify-center rounded-4xl p-0">
                {isPlaying ? (
                    <PauseIcon className="size-6" />
                ) : (
                    <PlayIcon className="size-6" />
                )}
            </Button>
            <Button
                variant="ghost"
                className="h-8 w-8 rounded-full p-0"
                onClick={playNext}>
                <SkipForwardIcon />
            </Button>
        </div>
    )
}
