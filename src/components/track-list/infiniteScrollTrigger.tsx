import { useInfiniteScroll } from '@/hooks/useInfinteScroll'
import React, { useRef } from 'react'

type Props = {
    hasMore: boolean
    onIntersect: () => void
}

export default function InfiniteScrollTrigger({ hasMore, onIntersect }: Props) {
    const observerRef = useRef<HTMLDivElement | null>(null)

    useInfiniteScroll({
        targetRef: observerRef,
        hasMore,
        onIntersect: onIntersect,
        rootMargin: '200px',
        threshold: 0.1,
    })

    return (
        <>
            {hasMore && (
                <div ref={observerRef} className="h-10 text-center">
                    Loading...
                </div>
            )}
        </>
    )
}
