'use client'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileMusicIcon, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { trackUploadSchema } from '../../../@types/validators'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

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
        if (coverImageFile instanceof File === false) setPreviewUrl(null)
        else {
            const objectUrl = URL.createObjectURL(coverImageFile)
            setPreviewUrl(objectUrl)

            return () => URL.revokeObjectURL(objectUrl)
        }
    }, [coverImageFile])

    async function onSubmit(values: z.infer<typeof trackUploadSchema>) {
        const data = new FormData()
        data.append('author', values.author)
        data.append('name', values.name)
        data.append(
            'imageFile',
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
        <Dialog>
            <DialogTrigger asChild>
                <Button>Upload new track</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md p-4">
                <DialogTitle>Track upload</DialogTitle>
                <Form {...form}>
                    <form
                        className="flex flex-col gap-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col justify-stretch gap-4 p-0 md:flex-row">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex max-w-full flex-col justify-stretch gap-4 md:flex-row">
                            <FormField
                                control={form.control}
                                name="coverImageFile"
                                render={({
                                    // Оставвлять поле не контролируемым
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    field: { onChange, value, ...field },
                                }) => (
                                    <FormItem className="w-fit">
                                        <FormControl>
                                            <div>
                                                <label
                                                    className="hover:bg-muted relative flex h-36 w-36 cursor-pointer flex-col content-end items-center justify-center gap-2 rounded border text-center transition"
                                                    htmlFor="imageFileInputId">
                                                    {previewUrl ? (
                                                        <Image
                                                            src={previewUrl}
                                                            alt="Track cover"
                                                            fill
                                                            className="rounded object-cover"
                                                        />
                                                    ) : (
                                                        <>
                                                            <PlusIcon className="text-muted-foreground h-10 w-10" />
                                                            <p className="text-muted-foreground text-xs leading-tight">
                                                                Select image for
                                                                track cover
                                                            </p>
                                                        </>
                                                    )}
                                                </label>
                                                <Input
                                                    id="imageFileInputId"
                                                    hidden
                                                    type="file"
                                                    accept="image/jpeg, image/png, image/webp"
                                                    placeholder="Track author"
                                                    onChange={(event) => {
                                                        onChange(
                                                            event.target
                                                                ?.files?.[0] ??
                                                                undefined,
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="trackFile"
                                render={({
                                    // Смотри поле imageFile
                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                    field: { onChange, value, ...field },
                                }) => (
                                    <FormItem>
                                        <FormLabel>Track file</FormLabel>
                                        <FormControl>
                                            <label
                                                htmlFor="trackFileInput"
                                                className="flex w-full min-w-0">
                                                {trackFile && (
                                                    <div className="w-full text-white">
                                                        <div className="flex flex-col overflow-hidden rounded-2xl border bg-amber-500 p-4">
                                                            <FileMusicIcon />
                                                            <span className="truncate overflow-hidden text-sm font-medium whitespace-nowrap">
                                                                {trackFile.name}
                                                            </span>
                                                            <span>
                                                                {(
                                                                    trackFile.size /
                                                                    1024 /
                                                                    1024
                                                                ).toFixed(
                                                                    2,
                                                                )}{' '}
                                                                MB
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                                <Input
                                                    hidden={
                                                        trackFile !== undefined
                                                    }
                                                    id="trackFileInput"
                                                    type="file"
                                                    accept="audio/mp3"
                                                    placeholder="Track file"
                                                    onChange={(event) => {
                                                        onChange(
                                                            event.target
                                                                ?.files?.[0] ??
                                                                undefined,
                                                        )
                                                    }}
                                                />
                                            </label>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-20">
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
