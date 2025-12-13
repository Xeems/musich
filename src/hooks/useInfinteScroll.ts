import { useEffect } from 'react'

type UseInfiniteScrollProps = {
    targetRef: React.RefObject<Element | null>
    hasMore: boolean
    onIntersect: () => void
    rootMargin?: string
    threshold?: number
}

export function useInfiniteScroll({
    targetRef,
    hasMore,
    onIntersect,
    rootMargin = '0px',
    threshold = 1.0,
}: UseInfiniteScrollProps) {
    useEffect(() => {
        if (!hasMore) return
        const el = targetRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) onIntersect()
            },
            { root: null, rootMargin, threshold },
        )

        observer.observe(el)

        return () => observer.unobserve(el)
    }, [hasMore, onIntersect, rootMargin, threshold, targetRef])
}
