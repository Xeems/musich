import { ScrollArea } from '@/components/ui/scroll-area'
import Player from '../../../player/Player'
import Modal from './Modal'

export default function Page() {
    return (
        <Modal>
            <ScrollArea className="h-svh">
                <Player />
            </ScrollArea>
        </Modal>
    )
}
