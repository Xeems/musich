'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { trackUploadSchema } from '../../../@types/validators'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { ImageIcon, MusicIcon, UploadIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useFilePreview } from '@/hooks/useFilePreview'
import useTrackMetadata from '@/hooks/useTrackMetadata'
import { milSecToMins } from '@/lib/utils'

type TrackUploadFormProps = {
    onSuccess?: () => void
}

export default function TrackUploadForm({ onSuccess }: TrackUploadFormProps) {
    const form = useForm<z.infer<typeof trackUploadSchema>>({
        resolver: zodResolver(trackUploadSchema),
        defaultValues: {
            author: '',
            name: '',
        },
    })

    const coverImageFile = form.watch('coverImageFile')
    const previewUrl = useFilePreview(coverImageFile)

    const trackFile = form.watch('trackFile')
    const trackMetadata = useTrackMetadata(trackFile)

    async function onSubmit(values: z.infer<typeof trackUploadSchema>) {
        const data = new FormData()
        data.append('author', values.author)
        data.append('name', values.name)
        data.append(
            'coverImageFile',
            values.coverImageFile,
            values.coverImageFile.name,
        )
        data.append('trackFile', values.trackFile, values.trackFile.name)

        const res = await fetch('/api/track', {
            method: 'POST',
            body: data,
        })

        if (res.ok) {
            onSuccess?.()

            form.reset()
        } else {
            const error = await res.json()
            console.error('Upload failed:', error)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4">
                {/* Track Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter track title"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Author */}
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter artist name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* File Inputs Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Cover Image */}
                    <FormField
                        control={form.control}
                        name="coverImageFile"
                        render={({ field: { onChange } }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Cover Image</FormLabel>
                                <FormControl>
                                    <label
                                        htmlFor="imageFileInputId"
                                        className="hover:bg-muted relative flex h-36 w-36 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border text-center transition">
                                        {previewUrl ? (
                                            <Image
                                                src={previewUrl}
                                                alt="Track cover"
                                                fill
                                                className="rounded object-cover"
                                            />
                                        ) : (
                                            <div>
                                                <ImageIcon className="text-primary mx-auto mb-2 h-8 w-8" />
                                                <p className="text-primary text-sm font-medium">
                                                    Click to upload
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Square images only
                                                </p>
                                            </div>
                                        )}
                                        <Input
                                            id="imageFileInputId"
                                            hidden
                                            type="file"
                                            accept="image/jpeg, image/png, image/webp"
                                            onChange={(e) =>
                                                onChange(
                                                    e.target.files?.[0] ??
                                                        undefined,
                                                )
                                            }
                                        />
                                    </label>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Track File */}
                    <FormField
                        control={form.control}
                        name="trackFile"
                        render={({ field: { onChange } }) => (
                            <FormItem className="flex flex-col md:col-span-2">
                                <FormLabel>Track File</FormLabel>
                                <FormControl>
                                    <div>
                                        <Input
                                            id="trackFileInput"
                                            type="file"
                                            accept="audio/mp3"
                                            onChange={(e) =>
                                                onChange(
                                                    e.target.files?.[0] ??
                                                        undefined,
                                                )
                                            }
                                        />
                                        {trackFile && (
                                            <div className="mt-2 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-100/70 p-3 text-sm shadow-sm">
                                                <div className="shrink-0 rounded bg-emerald-200 p-1">
                                                    <MusicIcon className="text-success h-4 w-4" />
                                                </div>
                                                <div className="flex flex-1 flex-col overflow-hidden">
                                                    <span className="text-primary-content truncate font-medium">
                                                        {trackFile.name}
                                                    </span>
                                                    <div className="flex flex-row justify-between pr-4">
                                                        {/* Ugh... */}
                                                        {trackMetadata?.format
                                                            ?.duration ? (
                                                            <span>
                                                                {milSecToMins(
                                                                    trackMetadata
                                                                        .format
                                                                        .duration,
                                                                )}
                                                            </span>
                                                        ) : null}
                                                        <span className="text-muted-content truncate text-sm">
                                                            {/* Ugh x2...  */}
                                                            {(
                                                                trackFile.size /
                                                                1024 /
                                                                1024
                                                            ).toFixed(2)}{' '}
                                                            MB
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Footer */}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" size="lg">
                            <XIcon />
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" size="lg">
                        <UploadIcon />
                        Submit
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
