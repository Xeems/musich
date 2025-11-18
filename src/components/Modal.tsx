'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

export default function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (dialog && !dialog.open) dialog.showModal()

        const handleClose = () => router.back()
        dialog?.addEventListener('close', handleClose)
        dialog?.addEventListener('', handleClose)
        return () => dialog?.removeEventListener('close', handleClose)
    }, [router])

    return (
        <dialog
            ref={dialogRef}
            className="mx-auto mt-10 flex w-fit items-center justify-center rounded-2xl bg-white p-6 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm">
            {children}
        </dialog>
    )
}
