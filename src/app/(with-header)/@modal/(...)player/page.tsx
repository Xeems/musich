import { ScrollArea } from '@/components/ui/scroll-area'
import Player from '../../../player/Player'
import DrawerDialog from './DrawerDialog'

export default function Page() {
    return (
        <DrawerDialog>
            <ScrollArea className="h-svh">
                <Player />
            </ScrollArea>
        </DrawerDialog>
    )
}
