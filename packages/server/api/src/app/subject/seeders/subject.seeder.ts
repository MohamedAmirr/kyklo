import { puId } from '@pickup/shared'
import { databaseConnection } from '../../database/database-connection'
import { SchoolEntity } from '../../school/school.entity'
import { SubjectEntity } from '../subject.entity'
import { DepartmentEntity } from '../../department/department.entity'
import { SchoolGradeEntity } from '../../SchoolGrade/school-grade.entity'
import { getRandomEntity } from '../../helper/random-entity'

async function seedSubjects() {
    const randomSchool = await getRandomEntity(SchoolEntity, 'subject')

    const randomSchoolGrade = await getRandomEntity(
        SchoolGradeEntity,
        'subject',
        { schoolId: randomSchool.id }
    )

    const randomDepartment = await getRandomEntity(
        DepartmentEntity,
        'subject',
        { schoolId: randomSchool.id }
    )

    const subjectRepo = databaseConnection().getRepository(SubjectEntity)

    const subjects = [
        {
            id: puId(),
            name: 'Mathematics',
            schoolId: randomSchool.id,
            departmentId: randomDepartment.id,
            schoolGradeId: randomSchoolGrade.id,
            creditHours: 3,
        },
        {
            id: puId(),
            name: 'English',
            schoolId: randomSchool.id,
            departmentId: randomDepartment.id,
            schoolGradeId: randomSchoolGrade.id,
            creditHours: 3,
        },
    ]

    for (const subject of subjects) {
        const newSubject = subjectRepo.create(subject)
        await subjectRepo.save(newSubject)
    }
}

export async function seedDevSubjects() {
    try {
        await seedSubjects()
        console.log('✅ Subjects seeded successfully!')
    } catch (error) {
        console.error('🚨 Error during subject seeding:', error)
    }
}
