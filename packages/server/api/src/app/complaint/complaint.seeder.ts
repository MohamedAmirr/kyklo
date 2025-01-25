import { ComplaintCategoriesEntity, ComplaintsEntity } from './complaint.entity'
import { UserEntity } from '../user/user.entity'
import { SchoolEntity } from '../school/school.entity'
import { databaseConnection } from '../database/database-connection'
import { puId, ComplaintStatus } from '@pickup/shared'

async function seedComplaints() {
    const complaintCategoryRepo = databaseConnection().getRepository(
        ComplaintCategoriesEntity
    )
    const userRepo = databaseConnection().getRepository(UserEntity)
    const schoolRepo = databaseConnection().getRepository(SchoolEntity)
    const complaintsRepo = databaseConnection().getRepository(ComplaintsEntity)

    for (let i = 0; i < 5; i++) {
        const complaintCategory = complaintCategoryRepo.create({
            id: `sample-category-${i}`,
            name: `Sample Category ${i}`,
        })
        await complaintCategoryRepo.save(complaintCategory)
    }

    for (let i = 0; i < 10; i++) {
        const randomCategory = await complaintCategoryRepo
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

        const complaint = complaintsRepo.create({
            id: puId(),
            title: `Sample Complaint Title ${random}`,
            status: i % 2 === 0 ? ComplaintStatus.OPEN : ComplaintStatus.CLOSED,
            description: `This is a sample description for complaint ${random}.`,
            number: i + 1,
            schoolId: randomSchool.id,
            categoryId: randomCategory.id,
            reporterId: randomUser.id,
        })

        await complaintsRepo.save(complaint)
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
