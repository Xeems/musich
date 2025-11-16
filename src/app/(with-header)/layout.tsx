import AudioPlayer from '@/components/player/AudioPlayer'
import Header from '@/components/Header'
import GlobalAudio from '@/components/player/GlobalAudio'

export default function Layout({
    children,
    modal,
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <div className="pb-40">
            <GlobalAudio />
            <Header />
            <div>
                {children}
                {modal}
            </div>
            <AudioPlayer />
        </div>
    )
}
