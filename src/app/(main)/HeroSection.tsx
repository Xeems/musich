import SearchBar from '@/app/(with-header)/search/SearchBar'
import { MusicIcon, Play } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className="20 relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
            <div className="from-primary/20 via-background to-background absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))]" />

            <div className="relative z-10 mx-auto max-w-6xl space-y-8 text-center">
                <div className="mb-6 flex items-center justify-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-orange-200 to-orange-300 p-2.5 shadow-md">
                        <MusicIcon className="h-6 w-6 text-orange-700" />
                    </div>
                    <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
                        Musich
                    </h1>
                </div>

                <div className="space-y-4">
                    <h2 className="text-5xl font-bold tracking-tight text-balance md:text-7xl lg:text-8xl">
                        Your music.
                        <br />
                        <span className="text-primary">Everywhere.</span>
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-pretty md:text-2xl">
                        Stream millions of songs, create playlists, and discover
                        new artists. All in one place.
                    </p>
                </div>

                <div className="mx-auto max-w-2xl pt-4">
                    <SearchBar />
                </div>

                <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                    <Link
                        href={'/trending'}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground flex h-14 flex-row items-center gap-x-2 rounded-md px-4 text-lg font-semibold">
                        <Play className="size-5" />
                        Explore popular tracks
                    </Link>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-3 gap-8 pt-12">
                    <div className="space-y-1">
                        <div className="text-primary text-3xl font-bold md:text-4xl">
                            100M+
                        </div>
                        <div className="text-muted-foreground text-sm">
                            Songs
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-primary text-3xl font-bold md:text-4xl">
                            50M+
                        </div>
                        <div className="text-muted-foreground text-sm">
                            Users
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-primary text-3xl font-bold md:text-4xl">
                            195
                        </div>
                        <div className="text-muted-foreground text-sm">
                            Countries
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
