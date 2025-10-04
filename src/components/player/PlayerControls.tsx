import React from 'react'
import { Button } from '../ui/button'
import {
    PauseIcon,
    PlayIcon,
    SkipBackIcon,
    SkipForwardIcon,
} from 'lucide-react'
import { useTrackQueue } from '@/hooks/player/useTrackQueue'
import { usePlayerControls } from '@/hooks/player/usePlayerControls'
import { TrackType } from '../../../@types/track'

type Props = {
    audioRef: React.RefObject<HTMLAudioElement | null>
    track: TrackType | null
}

export default function PlayerControls({ audioRef, track }: Props) {
    const { playNext, playPrev } = useTrackQueue(audioRef)
    const { togglePlay, isPlaying } = usePlayerControls(audioRef)

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
