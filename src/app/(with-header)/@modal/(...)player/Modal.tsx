'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

export default function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <Dialog
            defaultOpen
            onOpenChange={() => {
                router.back()
            }}>
            {/* TO DO fullscreen dialog on mobile */}
            <DialogContent className="h-screen max-h-none w-screen max-w-none rounded-none md:h-fit md:w-xl md:rounded-lg">
                <DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogTitle>
                {children}
            </DialogContent>
        </Dialog>
    )
}
