import { Disc3, ListMusic, Radio, Users } from 'lucide-react'
import Image from 'next/image'

const features = [
    {
        icon: Disc3,
        title: 'Unlimited Playlists',
        description:
            'Create and organize unlimited playlists. Share them with friends or keep them private.',
        image: '/music-playlist-interface-dark-theme-orange-accents.jpg',
    },
    {
        icon: Radio,
        title: 'Live Radio Stations',
        description:
            'Tune into curated radio stations from genres around the world, 24/7.',
        image: '/radio-station-interface-dark-theme-with-orange-glo.jpg',
    },
    {
        icon: ListMusic,
        title: 'Smart Queue',
        description:
            'AI-powered queue that adapts to your listening mood and preferences in real-time.',
        image: '/music-queue-interface-dark-minimalist-orange-highl.jpg',
    },
    {
        icon: Users,
        title: 'Social Listening',
        description:
            'Connect with friends, share tracks, and discover what others are listening to.',
        image: '/social-music-sharing-interface-dark-theme.jpg',
    },
]

export function FeaturesGrid() {
    return (
        <section className="bg-secondary/30 px-4 py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 space-y-4 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
                        Powerful Features for{' '}
                        <span className="text-primary">Music Lovers</span>
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-pretty">
                        Everything you need to enjoy, discover, and share music
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-card border-border hover:border-primary/50 relative overflow-hidden rounded-2xl border transition-all">
                            <div className="bg-secondary relative aspect-video overflow-hidden">
                                <Image
                                    src={feature.image || '/placeholder.svg'}
                                    alt={feature.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="from-card via-card/50 absolute inset-0 bg-gradient-to-t to-transparent" />
                            </div>
                            <div className="space-y-4 p-8">
                                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                                    <feature.icon className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="text-foreground text-2xl font-semibold">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
