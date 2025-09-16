export type TrackType = {
    id: string
    name: string
    author: string
    imageName: string | null
    createdAt: Date | null
    duration: number
    trackDir: string | undefined
    likesCount: number
    isLikedByCurrentUser: boolean
}
