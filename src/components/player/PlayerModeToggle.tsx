import React from 'react'
import { Button } from '../ui/button'
import { useTrackQueue } from '@/hooks/player/useTrackQueue'
import { Repeat1Icon, RepeatIcon, ShuffleIcon } from 'lucide-react'

type Props = {
    audioRef: React.RefObject<HTMLAudioElement | null>
}

export default function PlayerModeToggle({ audioRef }: Props) {
    const { togglePlayMode, playMode } = useTrackQueue(audioRef)

    return (
        <Button variant={'ghost'} onClick={togglePlayMode} className="!p-2">
            {playMode === 'queue' && <RepeatIcon className="size-5" />}
            {playMode === 'random' && <ShuffleIcon className="size-5" />}
            {playMode === 'loop' && <Repeat1Icon className="size-5" />}
        </Button>
    )
}
