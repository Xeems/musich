import AudioPlayer from '@/components/player/AudioPlayer'
import Header from '@/components/Header'

export default function Layout({
    children,
    modal,
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <div className="pb-40">
            {modal}
            <Header />
            <div>{children}</div>
            <AudioPlayer />
        </div>
    )
}
