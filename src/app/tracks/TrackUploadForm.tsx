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
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { trackUploadSchema } from '../../../@types/validators'

export default function TrackUploadForm() {
    const form = useForm<z.infer<typeof trackUploadSchema>>({
        resolver: zodResolver(trackUploadSchema),
    })

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const imageFile = form.watch('imageFile')

    useEffect(() => {
        if (imageFile instanceof File === false) setPreviewUrl(null)
        else {
            const objectUrl = URL.createObjectURL(imageFile)
            setPreviewUrl(objectUrl)

            return () => URL.revokeObjectURL(objectUrl)
        }
    }, [imageFile])

    async function onSubmit(values: z.infer<typeof trackUploadSchema>) {
        const res = await fetch('/api/track', {
            method: 'POST',
            body: JSON.stringify(values),
        })
        console.log(res)
    }

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-2 m-2"
                onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="text-xl font-bold">Загрузить трек</h2>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Track name" {...field} />
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
                            <FormLabel>Track author</FormLabel>
                            <FormControl>
                                <Input placeholder="Track author" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageFile"
                    //Объявлять value при деструктуризаци поля, иначе вылетает ошибка прехода input из не котролируемого в контролируемое сосотояние
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Track cover</FormLabel>
                            <FormControl>
                                <div>
                                    <label
                                        className="relative w-36 h-36 rounded border flex flex-col content-end items-center justify-center gap-2 cursor-pointer text-center hover:bg-muted transition"
                                        htmlFor="imageFileInputId">
                                        {previewUrl ? (
                                            <Image
                                                src={previewUrl}
                                                alt="Track cover"
                                                fill
                                                className="object-cover rounded"
                                            />
                                        ) : (
                                            <>
                                                <PlusIcon className="w-10 h-10 text-muted-foreground" />
                                                <p className="text-xs text-muted-foreground leading-tight">
                                                    Select image for track cover
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
                                        {...field}
                                        onChange={(event) => {
                                            onChange(
                                                event.target?.files?.[0] ??
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
                    // Смотри поле imageFile
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>Track file</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="audio/mp3"
                                    placeholder="Track file"
                                    {...field}
                                    onChange={(event) => {
                                        onChange(
                                            event.target?.files?.[0] ??
                                                undefined,
                                        )
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-20">
                    Submit
                </Button>
            </form>
        </Form>
    )
}
