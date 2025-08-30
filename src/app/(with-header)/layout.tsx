import AudioPlayer from '@/components/AudioPlayer'
import Header from '@/components/Header'

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Header />
            <div>{children}</div>
            <AudioPlayer />
        </div>
    )
}
