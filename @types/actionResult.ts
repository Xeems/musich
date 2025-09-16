export type ActionResultType<T> =
    | { success: true; data?: T; message?: string }
    | { success: false; message: string }

export type MinimalActionResultType = {
    success: boolean
}

export type LikeResult =
    | { success: true; isLiked: boolean }
    | { success: false; message: string }
