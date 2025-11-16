import React from 'react'
import { Button } from '../ui/button'
import { Volume2Icon, VolumeXIcon } from 'lucide-react'
import { Slider } from '../ui/slider'
import usePlayerVolumeControls from '@/hooks/player/usePlayerVolumeControls'
import { usePlayerStore } from '@/store/playerStore'

export default function PlayerVolume() {
    const audioRef = usePlayerStore((s) => s.audioRef)
    const { volume, setVolume, isMuted, setIsMuted } =
        usePlayerVolumeControls(audioRef)

    function handleVolumeChange(value: number[]) {
        setIsMuted(false)
        setVolume(value[0])
    }

    return (
        <div className="mx-4 flex flex-row items-center gap-x-2">
            <Button
                variant="ghost"
                onClick={() => setIsMuted((prev) => !prev)}
                className="!p-2">
                {volume === 0 || isMuted ? (
                    <VolumeXIcon className="size-6" />
                ) : (
                    <Volume2Icon className="size-6" />
                )}
            </Button>
            <Slider
                className="w-20"
                max={1.0}
                min={0.0}
                step={0.01}
                value={[volume]}
                onValueChange={handleVolumeChange}
            />
        </div>
    )
}
