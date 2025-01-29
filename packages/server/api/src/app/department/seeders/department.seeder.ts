import { puId } from '@pickup/shared'
import { databaseConnection } from '../../database/database-connection'
import { SchoolEntity } from '../../school/school.entity'
import { DepartmentEntity } from '../department.entity'
import { getRandomEntity } from '../../helper/random-entity'

async function seedDepartments() {
    const randomSchool = await getRandomEntity(SchoolEntity, 'department')

    const departmentRepo = databaseConnection().getRepository(DepartmentEntity)
    const department = departmentRepo.create({
        id: puId(),
        name: 'Dev Department',
        schoolId: randomSchool.id,
    })
    await departmentRepo.save(department)
}

export async function seedDevDepartments() {
    try {
        await seedDepartments()
        console.log('✅ Departments seeded successfully!')
    } catch (error) {
        console.error('🚨 Error during department seeding:', error)
    }
}
