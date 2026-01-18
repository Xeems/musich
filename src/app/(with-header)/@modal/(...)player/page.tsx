import PlayerQueue from '@/app/player/PlayerQueue'
import PagePlayer from '../../../player/PagePlayer'
import PlayerDialog from './PlayerDialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    DesktopWrapper,
    MobileWrapper,
    ResponsiveWrapper,
} from '@/components/functional/ResponsiveWrapper'

import MobilePlayer from './MobilePlayer'

export default function Page() {
    return (
        <PlayerDialog>
            <ResponsiveWrapper breakpoint={1024}>
                <MobileWrapper>
                    <MobilePlayer />
                </MobileWrapper>

                <DesktopWrapper>
                    <div className="flex w-2/5 items-center">
                        <PagePlayer />
                    </div>

                    <ScrollArea className="flex-1">
                        <PlayerQueue />
                    </ScrollArea>
                </DesktopWrapper>
            </ResponsiveWrapper>
        </PlayerDialog>
    )
}
