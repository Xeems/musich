import z from 'zod'

export const trackUploadSchema = z.object({
    name: z
        .string()
        .min(2, { error: 'Too small: at least two characters' })
        .max(255),
    author: z
        .string()
        .min(2, { error: 'Too small: at least two characters' })
        .max(255),
    coverImageFile: z
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

export const newUserSchema = z
    .object({
        username: z
            .string()
            .min(5, 'Username must be at least 5 characters long')
            .max(255, 'Username must be no more than 255 characters')
            .nonempty(),

        email: z.email().nonempty(),

        password: z
            .string()
            .min(5, 'Password must be at least 5 characters long')
            .max(255, 'Password must be no more than 255 characters')
            .nonempty(),

        passwordConfirm: z.string().nonempty(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
    })
