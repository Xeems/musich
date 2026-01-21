'use client'
import PagePlayer from '@/app/player/PagePlayer'
import PlayerQueue from '@/app/player/PlayerQueue'
import { PagerItem, PagerView } from '@/components/functional/PagerView'
import { ScrollArea } from '@/components/ui/scroll-area'

const tabs = ['player', 'queue']

export default function MobilePlayer() {
    return (
        <PagerView>
            <PagerItem>
                <div className="h-full shrink-0">
                    <PagePlayer />
                </div>
            </PagerItem>
            <PagerItem>
                <div className="h-full shrink-0">
                    <ScrollArea className="h-full">
                        <div className="h-12" />
                        <PlayerQueue />
                    </ScrollArea>
                </div>
            </PagerItem>
        </PagerView>
    )
}
