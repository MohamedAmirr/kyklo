import { puId, UserType } from '@pickup/shared'
import { databaseConnection } from '../../database/database-connection'
import { SchoolEntity } from '../../school/school.entity'
import { DepartmentEntity, DepartmentStaffEntity } from '../department.entity'
import { getRandomEntity } from '../../helper/random-entity'
import { UserEntity } from '../../user/user.entity'

async function seedDepartmentStaff() {
    const randomSchool = await getRandomEntity(SchoolEntity, 'department')
    const randomDepartment = await getRandomEntity(
        DepartmentEntity,
        'department staff',
        { schoolId: randomSchool.id }
    )
    const randomStaff = await getRandomEntity(UserEntity, 'department staff', {
        schoolId: randomSchool.id,
        type: UserType.STAFF,
    })

    const departmentStaffRepo = databaseConnection().getRepository(
        DepartmentStaffEntity
    )
    const departmentStaff = departmentStaffRepo.create({
        id: puId(),
        departmentId: randomDepartment.id,
        staffId: randomStaff.id,
        isHead: true,
    })
    await departmentStaffRepo.save(departmentStaff)
}

export async function seedDevDepartmentStaff() {
    try {
        await seedDepartmentStaff()
        console.log('✅ Department staff seeded successfully!')
    } catch (error) {
        console.error('🚨 Error during department seeding:', error)
    }
}
