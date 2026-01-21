import { useCallback, useEffect, useState } from 'react'

export function useSize<T extends HTMLElement>(): {
    ref: (node: T | null) => void
    width: number
    height: number
}

export function useSize<T extends HTMLElement>(
    target: React.RefObject<T>,
): {
    width: number
    height: number
}

export function useSize<T extends HTMLElement>(
    target: React.RefObject<T>,
): {
    width: number
    height: number
}

export function useSize<T extends HTMLElement>(target?: React.RefObject<T>) {
    const [size, setSize] = useState({ width: 0, height: 0 })
    const [node, setNode] = useState<T | null>(null)

    const ref = useCallback((el: T | null) => {
        setNode(el)
    }, [])

    const element = target?.current ?? node

    useEffect(() => {
        if (!element) return

        const update = () => {
            const rect = element.getBoundingClientRect()

            setSize({
                width: rect.width,
                height: rect.height,
            })
        }
        const t = setTimeout(() => {
            update()
        }, 300)

        const observer = new ResizeObserver(update)
        observer.observe(element)

        return () => {
            observer.disconnect()
            clearTimeout(t)
        }
    }, [element])

    if (target) {
        return size
    }

    return {
        ref,
        ...size,
    }
}
