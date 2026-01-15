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
            <DialogContent className="flex h-screen max-h-screen w-full max-w-screen rounded-none sm:max-w-screen md:max-w-screen lg:max-h-[80dvh] lg:max-w-5xl lg:rounded-lg">
                <DialogHeader className="shrink-0">
                    <DialogTitle />
                    <DialogDescription />
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
