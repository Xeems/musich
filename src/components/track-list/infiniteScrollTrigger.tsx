import { useInfiniteScroll } from '@/hooks/useInfinteScroll'
import React, { useRef } from 'react'
import { Spinner } from '../ui/spinner'

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
                <div
                    ref={observerRef}
                    className="flex flex-row items-center justify-center gap-x-4 text-center">
                    <Spinner className="size-5" />
                    <p>Loading...</p>
                </div>
            )}
        </>
    )
}
