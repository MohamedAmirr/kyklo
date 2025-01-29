import { categoryService } from '../category.service'
import { CategoryType } from '@pickup/shared'
import { SchoolEntity } from '../../school/school.entity'
import { getRandomEntity } from '../../helper/random-entity'

async function seedCategories() {
    const randomSchool = await getRandomEntity(SchoolEntity, 'category')

    const categories = [
        {
            name: 'Homework Issues',
            type: CategoryType.COMPLAINT,
            schoolId: randomSchool.id,
        },
        {
            name: 'Classroom Problems',
            type: CategoryType.COMPLAINT,
            schoolId: randomSchool.id,
        },
        {
            name: 'Bullying',
            type: CategoryType.COMPLAINT,
            schoolId: randomSchool.id,
        },
        {
            name: 'Other',
            type: CategoryType.COMPLAINT,
            schoolId: randomSchool.id,
        },
    ]
    await Promise.all(
        categories.map(category => categoryService.create(category))
    )
}

export async function seedDevCategories() {
    try {
        await seedCategories()
        console.log('✅ Categories seeded successfully!')
    } catch (error) {
        console.error('🚨 Error during category seeding:', error)
    }
}
