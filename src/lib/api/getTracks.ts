import { TrackType } from '../../../@types/track'

type Props = {
    url: string
    limit: number
    offset: number
}

export async function getTracks({ url, limit, offset }: Props) {
    const fullUrl = new URL(
        url,
        process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000',
    )

    fullUrl.searchParams.set('limit', String(limit))
    fullUrl.searchParams.set('offset', String(offset))

    const res = await fetch(fullUrl.toString(), {
        cache: 'no-store',
    })

    if (!res.ok) throw new Error('Failed to load tracks')

    return (await res.json()) as TrackType[]
}
