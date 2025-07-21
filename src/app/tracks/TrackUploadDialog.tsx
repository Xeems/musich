// components/track-upload/TrackUploadDialog.tsx
'use client'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { MusicIcon } from 'lucide-react'
import TrackUploadForm from './TrackUploadForm'

export default function TrackUploadDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Upload new track</Button>
            </DialogTrigger>
            <DialogContent className="-md p-6 md:max-w-xl [&>button:last-child]:hidden">
                <DialogHeader className="gap-1">
                    <DialogTitle className="text-primary flex flex-row items-center gap-x-2 text-2xl font-semibold">
                        <MusicIcon /> Track upload
                    </DialogTitle>
                    <DialogDescription>
                        Share your music with the world. Fill in the details
                        below to upload your track.
                    </DialogDescription>
                </DialogHeader>

                <TrackUploadForm />
            </DialogContent>
        </Dialog>
    )
}
