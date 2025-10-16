export type UserType = {
    id: string
    username: string
    email: string
    picture: string
    createdAt: Date
    updatedAt: Date
}

export type MinimalUserType = Pick<
    UserType,
    'id' | 'username' | 'email' | 'picture'
>
