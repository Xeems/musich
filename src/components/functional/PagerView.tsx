'use client'

import { useSize } from '@/hooks/useSize'
import { animate, motion, useMotionValue } from 'framer-motion'
import { Children, ReactElement, useEffect, useState } from 'react'

type PagerViewProps = {
    children: ReactElement[]
    index?: number
    onIndexChange?: (i: number) => void
}

export function PagerView({
    children,
    index: controlledIndex,
    onIndexChange,
}: PagerViewProps) {
    const count = Children.count(children)

    const [uncontrolledIndex, setUncontrolledIndex] = useState(0)
    const index = controlledIndex ?? uncontrolledIndex
    const x = useMotionValue(0)

    const { ref, width } = useSize()

    useEffect(() => {
        x.set(-index * width)
    }, [index, width, x])

    const setIndex = (i: number) => {
        if (controlledIndex == null) {
            setUncontrolledIndex(i)
        }
        onIndexChange?.(i)
    }

    const snapTo = (i: number) => {
        animate(x, -i * width, {
            type: 'spring',
            stiffness: 400,
            damping: 35,
        })
    }

    return (
        <div className="h-full w-full touch-pan-y overflow-hidden" ref={ref}>
            <motion.div
                className="flex h-full w-full"
                style={{
                    width: `${100 * count}%`,
                    x,
                }}
                drag="x"
                dragConstraints={{
                    left: -(count - 1) * width,
                    right: 0,
                }}
                dragElastic={0.15}
                dragMomentum={false}
                onDragEnd={(_, info) => {
                    const threshold = width * 0.2

                    if (info.offset.x < -threshold && index < count - 1) {
                        setIndex(index + 1)
                        snapTo(index + 1)
                        return
                    }

                    if (info.offset.x > threshold && index > 0) {
                        setIndex(index - 1)
                        snapTo(index - 1)
                        return
                    }

                    snapTo(index)
                }}>
                {Children.map(children, (child, i) => (
                    <div key={i} className="w-full">
                        {child}
                    </div>
                ))}
            </motion.div>
            {/* <div className="absolute bottom-2 left-0 flex w-screen justify-center gap-x-8">
                {Children.map(children, (child, i) => (
                    <motion.div
                        key={i}
                        className="bg-muted-foreground/50 size-2 rounded-full"
                    />
                ))}
            </div> */}
        </div>
    )
}
