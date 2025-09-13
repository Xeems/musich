import { create } from 'zustand'
import { MinimalUserType } from '../../@types/user'

interface UserState {
    user: MinimalUserType | null
    setUser: (u: MinimalUserType) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (u) => set({ user: u }),
}))
