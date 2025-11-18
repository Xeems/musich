import React from 'react'
import Modal from '../../../../components/Modal'
import Player from '../../player/Player'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export default function page() {
    return (
        <Dialog open={true}>
            <DialogContent className=" ">
                <Player />
            </DialogContent>
        </Dialog>
    )
}
