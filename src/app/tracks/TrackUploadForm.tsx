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
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const trackUploadFromSchema = z.object({
    name: z.string().min(2).max(255),
    author: z.string().min(2).max(255),
    imageFile: z
        .custom<File>((file) => file instanceof File, {
            message: 'Image file is required',
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'Image must be less than 5MB',
        })
        .refine(
            (file) =>
                ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
            {
                message: 'Supported formats: jpg, png, webp',
            },
        ),
    trackFile: z
        .custom<File>((file) => file instanceof File, {
            message: 'Track file is required',
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: 'Track must be less than 5MB',
        })
        .refine((file) => ['audio/mpeg', 'audio/mp3'].includes(file.type), {
            message: 'Only MP3 files are supported',
        }),
})

export default function TrackUploadForm() {
    const form = useForm<z.infer<typeof trackUploadFromSchema>>({
        resolver: zodResolver(trackUploadFromSchema),
    })

    function onSubmit(values: z.infer<typeof trackUploadFromSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                                        <PlusIcon className="absolute top-1/2 left-1/2 w-10 h-10 text-muted-foreground " />

                                        <p className="text-xs text-muted-foreground leading-tight">
                                            Select image for track cover
                                        </p>
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
