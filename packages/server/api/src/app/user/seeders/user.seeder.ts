import { UserType } from '@pickup/shared'
import { SchoolEntity } from '../../school/school.entity'
import { userService } from '../user.service'
import { logger } from '@pickup/server-shared'
import { getRandomEntity } from '../../helper/random-entity'

const USER_SEED_COUNT = 4

async function seedUsers() {
    const randomSchool = await getRandomEntity(SchoolEntity, 'user')

    const USER_DEV_PASSWORD = '12345678'

    for (let i = 0; i < USER_SEED_COUNT; i++) {
        const userTypes = Object.values(UserType)
        const randomNumber = Math.floor(Math.random() * 1000)

        const user = await userService.create({
            email: `user${randomNumber}@pu.com`,
            password: USER_DEV_PASSWORD,
            firstName: `Dev${randomNumber}`,
            lastName: 'User',
            schoolId: randomSchool.id,
            type: userTypes[i % userTypes.length],
        })
        if (user) {
            logger.info(
                { name: 'seedDevStudentUser' },
                `email=${user.email} pass=${USER_DEV_PASSWORD}`
            )
        } else {
            logger.error({ name: 'seedDevStudentUser' }, `Failed to seed user`)
        }
    }
}

export async function seedDevUsers() {
    try {
        await seedUsers()
        console.log('✅ Users seeded successfully!')
    } catch (error) {
        console.error('🚨 Error during user seeding:', error)
    }
}
