import { logger, SharedSystemProp, system } from '@pickup/server-shared'
import {
    PuEnvironment,
    puId,
    SchoolGrades,
    SchoolSemesters,
    UserStatus,
    UserType,
} from '@pickup/shared'
import { databaseConnection } from '../database-connection'
import { FlagEntity } from '../../flags/flag.entity'
import { SchoolEntity } from '../../school/school.entity'
import { userService } from '../../user/user.service'
import { StudentEntity } from '../../student/student.entity'
import { ClassroomEntity } from '../../classroom/classroom.entity'
import { ClassroomMemberEntity } from '../../classroom-members/classroom-member.entity'
import { seedDevTickets } from '../../tickets/ticket.seeder'

const DEV_DATA_SEEDED_FLAG = 'DEV_DATA_SEEDED'

const currentEnvIsNotDev = (): boolean => {
    const env = system.get(SharedSystemProp.ENVIRONMENT)
    return env !== PuEnvironment.DEVELOPMENT
}

const devDataAlreadySeeded = async (): Promise<boolean> => {
    const flagRepo = databaseConnection().getRepository(FlagEntity)
    const devSeedsFlag = await flagRepo.findOneBy({ id: DEV_DATA_SEEDED_FLAG })
    return devSeedsFlag?.value === true
}

const setDevDataSeededFlag = async (): Promise<void> => {
    const flagRepo = databaseConnection().getRepository(FlagEntity)

    await flagRepo.save({
        id: DEV_DATA_SEEDED_FLAG,
        value: true,
    })
}

const seedDevUser = async (): Promise<void> => {
    const USER_DEV_EMAIL = 'user@pu.com'
    const USER_DEV_PASSWORD = '12345678'
    const TEACHER_DEV_EMAIL = 'teacher@pu.com'
    const TEACHER_DEV_PASSWORD = '12345678'

    const schoolRepo = databaseConnection().getRepository(SchoolEntity)
    const studentRepo = databaseConnection().getRepository(StudentEntity)
    const classroomRepo = databaseConnection().getRepository(ClassroomEntity)
    const classroomMemberRepo = databaseConnection().getRepository(
        ClassroomMemberEntity
    )

    const school = schoolRepo.create({
        id: puId(),
        name: 'Dev School',
    })
    await schoolRepo.save(school)

    const teacher = await userService.create({
        email: TEACHER_DEV_EMAIL,
        password: TEACHER_DEV_PASSWORD,
        firstName: 'Teacher',
        lastName: 'User',
        schoolId: school.id,
        type: UserType.STAFF,
    })

    const user = await userService.create({
        email: USER_DEV_EMAIL,
        password: USER_DEV_PASSWORD,
        firstName: 'Dev',
        lastName: 'User',
        schoolId: school.id,
        type: UserType.STUDENT,
    })

    const classroom = classroomRepo.create({
        id: puId(),
        name: 'Dev Classroom',
        teacherId: teacher.id,
        schoolId: school.id,
    })
    await classroomRepo.save(classroom)

    const student = studentRepo.create({
        id: puId(),
        grade: SchoolGrades.FIRST,
        semester: SchoolSemesters.FIRST,
        classroomId: classroom.id,
        userId: user.id,
    })
    await studentRepo.save(student)

    const classroomMemberStudent = classroomMemberRepo.create({
        id: puId(),
        userId: user.id,
        classroomId: classroom.id,
        schoolId: school.id,
    })
    await classroomMemberRepo.save(classroomMemberStudent)

    const classroomMemberTeacher = classroomMemberRepo.create({
        id: puId(),
        userId: teacher.id,
        classroomId: classroom.id,
        schoolId: school.id,
    })
    await classroomMemberRepo.save(classroomMemberTeacher)

    logger.info(
        { name: 'seedDevStudentUser' },
        `email=${USER_DEV_EMAIL} pass=${USER_DEV_PASSWORD}`
    )
    logger.info(
        { name: 'seedDevTeacherUser' },
        `email=${TEACHER_DEV_EMAIL} pass=${TEACHER_DEV_PASSWORD}`
    )
}

export const seedDevData = async (): Promise<void> => {
    if (currentEnvIsNotDev()) {
        logger.info(
            { name: 'seedDevData' },
            'skip: not in development environment'
        )
        return
    }

    if (await devDataAlreadySeeded()) {
        logger.info({ name: 'seedDevData' }, 'skip: already seeded')
        return
    }

    await seedDevUser()
    await seedDevTickets()
    await setDevDataSeededFlag()
}
