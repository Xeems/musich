import React from 'react'
import Modal from '../../../../components/Modal'
import Player from '../../player/Player'

export default function page() {
    return (
        <Modal>
            <div>
                <Player />
            </div>
        </Modal>
    )
}
