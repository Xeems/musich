import { IAudioMetadata, parseBlob } from 'music-metadata'
import { useEffect, useState } from 'react'

export default function useTrackMetadata(trackFile: File | undefined) {
    const [metadata, setMetadata] = useState<IAudioMetadata | null>(null)

    useEffect(() => {
        if (!trackFile) {
            setMetadata(null)
            return
        }

        const getMetadata = async () => {
            try {
                const metadata = await parseBlob(trackFile)
                setMetadata(metadata)
            } catch (error) {
                console.error('Failed to extract metadata:', error)
                setMetadata(null)
            }
        }

        getMetadata()
    }, [trackFile])

    return metadata
}
