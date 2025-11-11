import { BenefitsSection } from './BenefitsSection'
import { CTASection } from './CTASection'
import HeroSection from './HeroSection'

export default function MainPage() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <BenefitsSection />
            {/* <FeaturesGrid /> */}
            <CTASection />
        </main>
    )
}

