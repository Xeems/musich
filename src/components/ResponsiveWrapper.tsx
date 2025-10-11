'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface ResponsiveContextValue {
    isMobile: boolean
}

const ResponsiveContext = createContext<ResponsiveContextValue | null>(null)

interface ResponsiveWrapperProps {
    breakpoint?: number
    children: React.ReactNode
}

export function ResponsiveWrapper({
    breakpoint = 768,
    children,
}: ResponsiveWrapperProps) {
    const [isMobile, setIsMobile] = useState(true)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < breakpoint)
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [breakpoint])

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
