'use client'

import {
    DesktopWrapper,
    MobileWrapper,
    ResponsiveWrapper,
} from '@/components/ResponsiveWrapper'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer'
import { useRouter } from 'next/navigation'

export default function DrawerDialog({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    return (
        <ResponsiveWrapper breakpoint={530}>
            <DesktopWrapper>
                <Dialog
                    defaultOpen
                    onOpenChange={() => {
                        router.back()
                    }}>
                    <DialogContent //className="h-screen w-screen max-w-none rounded-none md:max-h-[90vh] md:w-xl md:rounded-lg"
                    >
                        <DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogTitle>
                        <div>{children}</div>
                    </DialogContent>
                </Dialog>
            </DesktopWrapper>

            <MobileWrapper>
                <Drawer
                    defaultOpen
                    onOpenChange={() => {
                        router.back()
                    }}>
                    <DrawerContent className="flex h-[100dvh] max-h-[100dvh] flex-col rounded-none">
                        <DrawerHeader>
                            <DrawerTitle></DrawerTitle>
                        </DrawerHeader>
                        <div>{children}</div>
                    </DrawerContent>
                </Drawer>
            </MobileWrapper>
        </ResponsiveWrapper>
    )
}
