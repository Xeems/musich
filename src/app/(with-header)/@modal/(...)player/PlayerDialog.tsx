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
            <DialogContent className="flex h-screen max-h-screen w-full max-w-screen gap-x-0 rounded-none px-0 md:max-w-screen md:px-6 lg:max-h-[80dvh] lg:max-w-5xl lg:rounded-lg">
                <DialogHeader className="shrink-0">
                    <DialogTitle />
                    <DialogDescription />
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
