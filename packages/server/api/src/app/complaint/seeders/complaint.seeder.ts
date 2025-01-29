import { UserEntity } from '../../user/user.entity'
import { SchoolEntity } from '../../school/school.entity'
import { complaintsService } from '../complaint.service'
import { CategoriesEntity } from '../../category/category.entity'
import { getRandomEntity } from '../../helper/random-entity'

async function seedComplaints() {
    for (let i = 0; i < 10; i++) {
        const randomSchool = await getRandomEntity(SchoolEntity, 'complaints')

        const randomCategory = await getRandomEntity(
            CategoriesEntity,
            'complaints',
            { schoolId: randomSchool.id }
        )

        const randomUser = await getRandomEntity(UserEntity, 'complaints', {
            schoolId: randomSchool.id,
        })

        const random = Math.floor(Math.random() * 1000)

        const complaint = await complaintsService.create({
            title: `Sample Complaint Title ${random}`,
            description: `This is a sample description for complaint ${random}.`,
            schoolId: randomSchool.id,
            categoryId: randomCategory.id,
            reporterId: randomUser.id,
        })
        if (!complaint) {
            console.error('Failed to seed one complaint')
        }
    }
}

export async function seedDevComplaints() {
    try {
        await seedComplaints()
        console.log('✅ Complaints seeded successfully!')
    } catch (error) {
        console.error('🚨 Error during complaints seeding:', error)
    }
}
