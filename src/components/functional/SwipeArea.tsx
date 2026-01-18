import { useRef } from 'react'

type SwipeAreaProps = {
    value: string
    onChange: (v: string) => void
    children: React.ReactNode
}

const THRESHOLD = 50

function SwipeArea({ value, onChange, children }: SwipeAreaProps) {
    const startX = useRef<number | null>(null)

    const onPointerDown = (e: React.PointerEvent) => {
        startX.current = e.clientX
    }

    const onPointerUp = (e: React.PointerEvent) => {
        if (startX.current === null) return

        const diff = e.clientX - startX.current
        startX.current = null

        if (Math.abs(diff) < THRESHOLD) return

        const index = tabs.indexOf(value)
        if (index === -1) return

        if (diff < 0 && index < tabs.length - 1) {
            onChange(tabs[index + 1]) // swipe left
        }

        if (diff > 0 && index > 0) {
            onChange(tabs[index - 1]) // swipe right
        }
    }

    return (
        <div
            className="relative touch-pan-y overflow-hidden"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}>
            {children}
        </div>
    )
}
