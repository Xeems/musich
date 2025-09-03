export type ActionResultType<T = undefined> =
    | { success: true; data?: T; message?: string }
    | { success: false; message: string }
