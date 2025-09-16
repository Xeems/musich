export type ActionResultType<T> =
    | { success: true; data?: T; message?: string }
    | { success: false; message: string }

export type MinimalActionResultType = {
    success: boolean
}
