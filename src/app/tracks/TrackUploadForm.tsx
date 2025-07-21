// components/track-upload/TrackUploadForm.tsx
'use client'

import { useEffect, useState } from 'react'
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
import { ImageIcon, MusicIcon, UploadIcon } from 'lucide-react'
import Image from 'next/image'

export default function TrackUploadForm() {
    const form = useForm<z.infer<typeof trackUploadSchema>>({
        resolver: zodResolver(trackUploadSchema),
        defaultValues: {
            author: '',
            name: '',
        },
    })

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const coverImageFile = form.watch('coverImageFile')
    const trackFile = form.watch('trackFile')

    useEffect(() => {
        if (!(coverImageFile instanceof File)) {
            setPreviewUrl(null)
            return
        }

        const objectUrl = URL.createObjectURL(coverImageFile)
        setPreviewUrl(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [coverImageFile])

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

        console.log(res)
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}>
                {/* Title Field */}
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

                {/* Author Field */}
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

                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
                    {/* Cover Image Input */}
                    <FormField
                        control={form.control}
                        name="coverImageFile"
                        render={({ field: { onChange } }) => (
                            <FormItem className="flex w-fit flex-col">
                                <FormLabel>Cover Image</FormLabel>
                                <FormControl>
                                    <label
                                        htmlFor="imageFileInputId"
                                        className="hover:bg-muted relative flex h-36 w-36 cursor-pointer flex-col items-center justify-center gap-2 self-center rounded-md border text-center transition">
                                        {previewUrl ? (
                                            <Image
                                                src={previewUrl}
                                                alt="Track cover"
                                                fill
                                                className="rounded object-cover"
                                            />
                                        ) : (
                                            <>
                                                <ImageIcon className="text-primary mx-auto mb-2 h-8 w-8" />
                                                <p className="text-primary text-sm font-medium">
                                                    Click to upload
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Square images only
                                                </p>
                                            </>
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

                    {/* Track File Input */}
                    <FormField
                        control={form.control}
                        name="trackFile"
                        render={({ field: { onChange } }) => (
                            <FormItem className="flex flex-col space-y-2 md:col-span-2">
                                <FormLabel>Track file</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col space-y-2">
                                        <Input
                                            id="trackFileInput"
                                            className="max-w-full"
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
                                            <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-100/70 p-3 text-sm shadow-sm">
                                                <div className="shrink-0 rounded bg-emerald-200 p-1">
                                                    <MusicIcon className="text-success h-4 w-4" />
                                                </div>
                                                <div className="flex w-0 flex-1 flex-col overflow-hidden">
                                                    <span className="text-primary-content truncate font-medium">
                                                        {trackFile.name}
                                                    </span>
                                                    <span className="text-muted-content truncate text-sm">
                                                        {(
                                                            trackFile.size /
                                                            1024 /
                                                            1024
                                                        ).toFixed(2)}{' '}
                                                        MB
                                                    </span>
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

                <DialogFooter className="gap-4">
                    <DialogClose asChild>
                        <Button size="lg" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button size="lg" type="submit">
                        <UploadIcon />
                        Submit
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
