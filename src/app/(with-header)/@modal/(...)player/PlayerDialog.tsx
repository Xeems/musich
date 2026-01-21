'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { ChevronLeftIcon } from 'lucide-react'

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
            <DialogContent
                showCloseButton={false}
                className="flex h-dvh max-h-screen w-full max-w-screen gap-x-0 rounded-none p-0 sm:max-w-screen lg:max-h-[80dvh] lg:max-w-5xl lg:rounded-lg">
                <Button
                    className="absolute top-2 left-2 z-51 rounded-full font-black lg:hidden"
                    size={'icon'}
                    onClick={() => {
                        router.back()
                    }}>
                    <ChevronLeftIcon className="font-black" />
                </Button>
                <DialogHeader className="hidden">
                    <DialogTitle />
                    <DialogDescription />
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
