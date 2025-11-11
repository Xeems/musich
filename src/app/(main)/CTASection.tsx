import AuthLinks from '@/components/AuthLinks'
import { Music2 } from 'lucide-react'

export function CTASection() {
    return (
        <section className="px-4 py-24">
            <div className="mx-auto max-w-4xl">
                <div className="bg-card border-border relative overflow-hidden rounded-3xl border p-12 md:p-16">
                    <div className="from-primary/20 absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] via-transparent to-transparent" />

                    <div className="relative z-10 space-y-8 text-center">
                        <div className="bg-primary/10 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                            <Music2 className="text-primary h-8 w-8" />
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold tracking-tight text-balance md:text-5xl">
                                Ready to Start Your
                                <br />
                                <span className="text-primary">
                                    Musical Journey?
                                </span>
                            </h2>
                            <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-pretty">
                                Join millions of music lovers streaming their
                                favorite tracks on musich. Sign up now and get 3
                                months free.
                            </p>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                            {/* <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg">
                                <Download className="mr-2 h-5 w-5" />
                                Get Started Free
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-border hover:bg-secondary h-14 bg-transparent px-8 text-lg">
                                <Smartphone className="mr-2 h-5 w-5" />
                                Download App
                            </Button> */}
                            <AuthLinks />
                        </div>

                        <p className="text-muted-foreground pt-4 text-sm">
                            No credit card required • Cancel anytime • Available
                            on all devices
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
