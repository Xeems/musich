'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import { useRouter } from 'next/navigation'

export default function PlayerDialog({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    return (
        <Dialog
            defaultOpen
            onOpenChange={() => {
                router.back()
            }}>
            <DialogContent className="flex h-[65dvh] md:max-w-5xl">
                <DialogHeader>
                    <DialogTitle />
                    <DialogDescription />
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
