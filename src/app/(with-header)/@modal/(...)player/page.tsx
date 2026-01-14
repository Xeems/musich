import PlayerQueue from '@/app/player/PlayerQueue'
import PagePlayer from '../../../player/PagePlayer'
import PlayerDialog from './PlayerDialog'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Page() {
    return (
        <PlayerDialog>
            <div className="flex w-full flex-1 flex-row gap-4">
                <div className="flex w-2/5 items-center justify-stretch">
                    <PagePlayer />
                </div>

                <ScrollArea className="min-w-lg flex-1 shrink-1">
                    <PlayerQueue />
                </ScrollArea>
            </div>
        </PlayerDialog>
    )
}
