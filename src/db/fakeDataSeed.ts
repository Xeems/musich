import { db } from '@/db' // путь к твоей инициализации drizzle
import { TrackTable } from '@/db/schema'
import { faker } from '@faker-js/faker'

export async function seedTracks() {
    const tracks = Array.from({ length: 100 }).map(() => ({
        name: faker.music.songName(),
        author: faker.person.fullName(),
        imageName: faker.image.urlLoremFlickr({ category: 'music' }),
        fileName: `${faker.word.words(2).replace(/\s+/g, '_')}.mp3`,
        createdAt: new Date(),
    }))

    try {
        await db.insert(tracks).values(tracks)
        console.log('✅ Inserted 100 fake tracks')
    } catch (error) {
        console.error('❌ Failed to insert tracks:', error)
    }
}
