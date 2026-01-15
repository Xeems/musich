import PlayerQueue from '@/app/player/PlayerQueue'
import PagePlayer from '../../../player/PagePlayer'
import PlayerDialog from './PlayerDialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    DesktopWrapper,
    MobileWrapper,
    ResponsiveWrapper,
} from '@/components/ResponsiveWrapper'

export default function Page() {
    return (
        <PlayerDialog>
            <ResponsiveWrapper breakpoint={1024}>
                <MobileWrapper>
                    <Tabs
                        defaultValue="player"
                        className="flex h-full w-full items-center">
                        <TabsContent value="player">
                            <PagePlayer />
                        </TabsContent>
                        <TabsContent value="queue">
                            <ScrollArea className="flex-1">
                                <PlayerQueue />
                            </ScrollArea>
                        </TabsContent>

                        <TabsList>
                            <TabsTrigger value="player">Player</TabsTrigger>
                            <TabsTrigger value="queue">Queue</TabsTrigger>
                        </TabsList>
                    </Tabs>
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
