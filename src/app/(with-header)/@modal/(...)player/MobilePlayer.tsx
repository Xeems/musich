'use client'
import PagePlayer from '@/app/player/PagePlayer'
import PlayerQueue from '@/app/player/PlayerQueue'
import { ScrollArea } from '@/components/ui/scroll-area'

import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { useState } from 'react'

const tabs = ['player', 'queue']

export default function MobilePlayer() {
    const [tab, setTab] = useState('player')
    const [direction, setDirection] = useState(0)

    const index = tabs.indexOf(tab)

    const paginate = (dir: number) => {
        const next = index + dir
        if (next < 0 || next >= tabs.length) return

        setDirection(dir)
        setTab(tabs[next])
    }

    return (
        <div className="relative h-full w-full touch-pan-y overflow-hidden">
            <AnimatePresence mode="sync">
                <motion.div
                    key={tab}
                    custom={direction}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(_, info) => {
                        if (info.offset.x < -80) {
                            paginate(1)
                        } else if (info.offset.x > 80) {
                            paginate(-1)
                        }
                    }}
                    animate={{ x: 0 }}
                    initial={{ x: direction > 0 ? 1000 : -1000 }}
                    exit={{ x: direction > 0 ? 1000 : -1000 }}
                    transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 30,
                    }}
                    className="absolute inset-0">
                    {tab === 'player' && <PagePlayer />}
                    {tab === 'queue' && (
                        <ScrollArea className="h-full">
                            <PlayerQueue />
                        </ScrollArea>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="absolute right-0 bottom-0 left-0 grid grid-cols-2">
                <button onClick={() => paginate(-1)}>Player</button>
                <button onClick={() => paginate(1)}>Queue</button>
            </div>
        </div>
    )
}
