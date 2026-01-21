'use client'
import PagePlayer from '@/app/player/PagePlayer'
import PlayerQueue from '@/app/player/PlayerQueue'
import { PagerView } from '@/components/functional/PagerView'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function MobilePlayer() {
    return (
        <div className="w-full">
            <PagerView>
                <div className="h-full w-full">
                    <PagePlayer />
                </div>

                <div className="h-full w-full">
                    <ScrollArea className="h-full">
                        <div className="h-12" />
                        <PlayerQueue />
                    </ScrollArea>
                </div>
            </PagerView>
        </div>
    )
}
