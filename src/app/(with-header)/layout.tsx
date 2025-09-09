import AudioPlayer from '@/components/AudioPlayer'
import Header from '@/components/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pb-40">
            <Header />
            <div>{children}</div>
            <AudioPlayer />
        </div>
    )
}
