export default async function getTrackById(id: string) {
    const fullUrl = new URL(
        `track/${id}`,
        process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api',
    )

    const res = await fetch(fullUrl.toString(), {
        cache: 'no-store',
    })

    if (!res.ok) return undefined

    const json = await res.json()
    return json.data
}
