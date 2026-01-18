'use client'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useSyncExternalStore,
} from 'react'

const ResponsiveContext = createContext<{ isMobile: boolean } | null>(null)

interface ResponsiveWrapperProps {
    breakpoint?: number
    children: React.ReactNode
}

function createMediaQueryStore(breakpoint: number) {
    const query = `(max-width: ${breakpoint - 1}px)`

    const getSnapshot = () =>
        typeof window !== 'undefined' ? window.matchMedia(query).matches : false

    const getServerSnapshot = () => false

    const subscribe = (callback: () => void) => {
        const media = window.matchMedia(query)
        media.addEventListener('change', callback)
        return () => media.removeEventListener('change', callback)
    }

    return { getSnapshot, getServerSnapshot, subscribe }
}

export function ResponsiveWrapper({
    breakpoint = 768,
    children,
}: ResponsiveWrapperProps) {
    const { subscribe, getSnapshot, getServerSnapshot } =
        createMediaQueryStore(breakpoint)

    const isMobile = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    )

    return (
        <ResponsiveContext.Provider value={{ isMobile }}>
            {children}
        </ResponsiveContext.Provider>
    )
}

export function MobileWrapper({ children }: { children: React.ReactNode }) {
    const context = useContext(ResponsiveContext)
    if (!context)
        throw new Error('Mobile must be used within <ResponsiveWrapper>')
    return context.isMobile ? <>{children}</> : null
}

export function DesktopWrapper({ children }: { children: React.ReactNode }) {
    const context = useContext(ResponsiveContext)
    if (!context)
        throw new Error('Desktop must be used within <ResponsiveWrapper>')
    return context.isMobile ? null : <>{children}</>
}
