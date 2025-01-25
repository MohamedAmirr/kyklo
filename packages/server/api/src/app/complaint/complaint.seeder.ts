import { UserEntity } from '../user/user.entity'
import { SchoolEntity } from '../school/school.entity'
import { databaseConnection } from '../database/database-connection'
import { complaintsService } from './complaint.service'
import { CategoriesEntity } from '../category/category.entity'

async function seedComplaints() {
    const categoryRepo = databaseConnection().getRepository(CategoriesEntity)
    const userRepo = databaseConnection().getRepository(UserEntity)
    const schoolRepo = databaseConnection().getRepository(SchoolEntity)

    for (let i = 0; i < 10; i++) {
        const randomCategory = await categoryRepo
            .createQueryBuilder('category')
            .orderBy('RANDOM()')
            .limit(1)
            .getOne()

        const randomUser = await userRepo
            .createQueryBuilder('user')
            .orderBy('RANDOM()')
            .limit(1)
            .getOne()

        const randomSchool = await schoolRepo
            .createQueryBuilder('school')
            .orderBy('RANDOM()')
            .limit(1)
            .getOne()

        if (!randomCategory || !randomUser || !randomSchool) {
            throw new Error(
                'Failed to find random related entities for ticket seeding.'
            )
        }

        const random = Math.floor(Math.random() * 1000)

        const complaint = await complaintsService.create({
            title: `Sample Complaint Title ${random}`,
            description: `This is a sample description for complaint ${random}.`,
            schoolId: randomSchool.id,
            categoryId: randomCategory.id,
            reporterId: randomUser.id,
        })

        console.log(`Complaint ${random} created successfully:`, complaint)
    }
}

export async function seedDevComplaints() {
    try {
        await seedComplaints()
    } catch (error) {
        console.error('Error during complaint seeding:', error)
    }
}
