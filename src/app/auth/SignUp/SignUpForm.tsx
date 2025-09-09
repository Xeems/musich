'use client'

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
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { newUserSchema } from '../../../../@types/validators'
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GoogleIcon } from '../../../../public/GoogleIcon'
import signInOAuth from '@/authentification/actions/signInOAuth'
import signUp from '@/authentification/actions/signUp'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'

export default function SignUpForm() {
    const form = useForm<z.infer<typeof newUserSchema>>({
        resolver: zodResolver(newUserSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
    })

    const isSubmitting = form.formState.isSubmitting

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    async function onSubmit(values: z.infer<typeof newUserSchema>) {
        const data = await signUp(values)
        if (data.success === false) {
            form.setError('root', { message: data.message })
        }
    }

    return (
        <Form {...form}>
            <Card className="rounded-md border p-4">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-center text-2xl font-bold">
                        Sign Up
                    </CardTitle>
                    <CardDescription className="text-center">
                        Create a new account to listen to your favorite tracks
                        and artists
                    </CardDescription>
                </CardHeader>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Your username"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Your Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Create a password"
                                            {...field}
                                        />
                                        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="text-muted-foreground hover:text-foreground">
                                                {showPassword ? (
                                                    <EyeOffIcon className="h-4 w-4" />
                                                ) : (
                                                    <EyeIcon className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Confirm your Password"
                                            {...field}
                                        />
                                        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword,
                                                    )
                                                }
                                                className="text-muted-foreground hover:text-foreground">
                                                {showConfirmPassword ? (
                                                    <EyeOffIcon className="h-4 w-4" />
                                                ) : (
                                                    <EyeIcon className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        Continue
                    </Button>
                    {form.formState.errors.root && (
                        <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>Unable to create account.</AlertTitle>
                            <AlertDescription>
                                <p>{form.formState.errors.root.message}</p>
                            </AlertDescription>
                        </Alert>
                    )}
                </form>
                <div className="flex w-full flex-row items-center justify-center gap-x-4 overflow-hidden px-1">
                    <Separator /> <span>or</span>
                    <Separator />
                </div>
                <Button
                    disabled={isSubmitting}
                    onClick={async () => await signInOAuth('google')}
                    className="w-full border border-blue-200 bg-blue-100 text-blue-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-200 hover:text-blue-800 hover:shadow-md">
                    <GoogleIcon className="size-4 text-blue-700" />
                    Continue with the Google
                </Button>
                <Link
                    href={'/auth/signin'}
                    className="text-center text-blue-400">
                    Already have an account? Sign In
                </Link>
            </Card>
        </Form>
    )
}
