import UserCard from '../user/UserCard'
import MainNav from './MainNav'

import Logo from './Logo'
import MobileHeaderMenu from './MobileHeaderMenu'

export default function Header() {
    return (
        <header className="border-primary w-full border-b bg-gradient-to-r via-orange-50/80 px-4 backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-row items-center justify-between gap-x-4 py-2">
                <Logo />

                <div className="md:hidden">
                    <MobileHeaderMenu />
                </div>

                <div className="hidden md:flex">
                    <MainNav />
                </div>
                <div className="hidden md:flex">
                    <UserCard />
                </div>
            </div>
        </header>
    )
}
