import { SchoolEntity } from '../school.entity'
import { databaseConnection } from '../../database/database-connection'
import { puId } from '@pickup/shared'

async function seedSchools() {
    const schoolRepo = databaseConnection().getRepository(SchoolEntity)
    const school = schoolRepo.create({
        id: puId(),
        name: 'Dev School',
    })
    await schoolRepo.save(school)
}

export async function seedDevSchool() {
    try {
        await seedSchools()
        console.log('✅ School seeded successfully!')
    } catch (error) {
        console.error('🚨 Error during school seeding:', error)
    }
}
