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
        if (!hasMore || !targetRef || !targetRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onIntersect()
                }
            },
            {
                root: null,
                rootMargin,
                threshold,
            },
        )

        const target = targetRef.current
        observer.observe(target)

        return () => {
            if (target) observer.unobserve(target)
        }
    }, [targetRef, hasMore, onIntersect, rootMargin, threshold])
}
