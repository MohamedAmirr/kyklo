import { puId, UserType } from '@pickup/shared'
import { databaseConnection } from '../../database/database-connection'
import { SchoolEntity } from '../../school/school.entity'
import { ClassroomEntity } from '../classroom.entity'
import { SchoolGradeEntity } from '../../school-grade/school-grade.entity'
import { UserEntity } from '../../user/user.entity'
import { getRandomEntity } from '../../helper/random-entity'

async function seedClassrooms() {
    const randomSchool = await getRandomEntity(SchoolEntity, 'classroom')
    const randomTeacher = await getRandomEntity(UserEntity, 'classroom', {
        type: UserType.STAFF,
        schoolId: randomSchool.id,
    })

    const schoolGrades = await databaseConnection()
        .getRepository(SchoolGradeEntity)
        .find({ where: { schoolId: randomSchool.id } })
    const classroomRepo = databaseConnection().getRepository(ClassroomEntity)

    for (const schoolGrade of schoolGrades) {
        const classroom = classroomRepo.create({
            id: puId(),
            name: `Dev Classroom for Grade ${schoolGrade.id}`,
            teacherId: randomTeacher.id,
            schoolId: randomSchool.id,
            schoolGradeId: schoolGrade.id,
        })
        await classroomRepo.save(classroom)
    }
}

export async function seedDevClassrooms() {
    try {
        await seedClassrooms()
        console.log('✅ Classrooms seeded successfully!')
    } catch (error) {
        console.error('🚨 Error during classroom seeding:', error)
    }
}
