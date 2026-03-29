import { TrackType } from '../../../@types/track'

export default async function getTrackById(id: string) {
    const fullUrl = new URL(`track/${id}`, process.env.NEXT_PUBLIC_API_BASE_URL)

    const res = await fetch(fullUrl.toString(), {
        cache: 'no-store',
    })

    if (!res.ok) return undefined
    else {
        const json = await res.json()
        return json.data as TrackType
    }
}
