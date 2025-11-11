import { Headphones, Sparkles, Zap, Shield } from 'lucide-react'

const benefits = [
    {
        icon: Headphones,
        title: 'High-Quality Audio',
        description:
            'Experience crystal-clear sound with lossless audio streaming up to 24-bit/192kHz.',
    },
    {
        icon: Sparkles,
        title: 'Smart Recommendations',
        description:
            "AI-powered playlists that learn your taste and introduce you to music you'll love.",
    },
    {
        icon: Zap,
        title: 'Lightning Fast',
        description:
            'Instant playback with no buffering. Your music starts the moment you hit play.',
    },
    {
        icon: Shield,
        title: 'Ad-Free Experience',
        description:
            'Enjoy uninterrupted listening without ads. Just pure music, all day long.',
    },
]

export function BenefitsSection() {
    return (
        <section className="px-4 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 space-y-4 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
                        Why Choose <span className="text-primary">musich</span>?
                    </h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-pretty">
                        The ultimate music streaming experience designed for
                        music lovers
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="group bg-card border-border hover:border-primary/50 relative rounded-xl border p-6 transition-colors">
                            <div className="bg-primary/5 absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative space-y-4">
                                <div className="bg-primary/10 group-hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
                                    <benefit.icon className="text-primary h-6 w-6" />
                                </div>
                                <h3 className="text-foreground text-xl font-semibold">
                                    {benefit.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
