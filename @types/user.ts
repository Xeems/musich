export type UserType = {
    id: string
    name: string
}

export type MinimalUserType = Pick<UserType, 'id' | 'name'>
