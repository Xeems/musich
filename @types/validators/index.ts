import z from 'zod'

export const trackUploadSchema = z.object({
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
