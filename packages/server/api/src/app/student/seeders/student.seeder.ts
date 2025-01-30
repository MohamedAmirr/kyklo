import { databaseConnection } from '../../database/database-connection'
import { StudentEntity } from '../student.entity'
import { SchoolEntity } from '../../school/school.entity'
import { puId, SchoolSemesters, UserType } from '@pickup/shared'
import { UserEntity } from '../../user/user.entity'
import { ClassroomEntity } from '../../classroom/classroom.entity'
import { SchoolGradeEntity } from '../../school-grade/school-grade.entity'
import { getRandomEntity } from '../../helper/random-entity'

const seedStudents = async () => {
    const randomSchool = await getRandomEntity(SchoolEntity, 'student')
    const randomSchoolGrade = await getRandomEntity(
        SchoolGradeEntity,
        'student',
        { schoolId: randomSchool.id }
    )
    const randomUser = await getRandomEntity(UserEntity, 'student', {
        type: UserType.STUDENT,
        schoolId: randomSchool.id,
    })
    const randomClassroom = await getRandomEntity(ClassroomEntity, 'student', {
        schoolId: randomSchool.id,
        schoolGradeId: randomSchoolGrade.id,
    })

    const studentRepo = databaseConnection().getRepository(StudentEntity)
    const student = studentRepo.create({
        id: puId(),
        semester: SchoolSemesters.FIRST,
        classroomId: randomClassroom.id,
        userId: randomUser.id,
        schoolGradeId: randomSchoolGrade.id,
    })
    await studentRepo.save(student)
}

export const seedDevStudents = async () => {
    try {
        await seedStudents()
        console.log('✅ Students seeded successfully!')
    } catch (error) {
        console.error('🚨 Error during student seeding:', error)
    }
}
