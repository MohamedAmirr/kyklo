import { logger, SharedSystemProp, system } from '@pickup/server-shared'
import {PuEnvironment, puId, SchoolGrades, SchoolSemesters, UserType} from '@pickup/shared'
import { databaseConnection } from '../database-connection'
import { FlagEntity } from '../../flags/flag.entity'
import {SchoolEntity} from "../../school/school.entity";
import {userService} from "../../user/user.service";
import { StudentEntity } from '../../student/student.entity';
import { ClassroomEntity } from '../../classroom/classroom.entity';

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
    const DEV_EMAIL = 'dev@ap.com';
    const DEV_PASSWORD = '12345678';

    const schoolRepo = databaseConnection().getRepository(SchoolEntity);
    const studentRepo = databaseConnection().getRepository(StudentEntity)
    const classroomRepo = databaseConnection().getRepository(ClassroomEntity)


    const school = schoolRepo.create({
        id: 'dev-school',
        name: 'Dev School',
    });
    await schoolRepo.save(school);

    const user = await userService.create({
        email: DEV_EMAIL,
        password: DEV_PASSWORD,
        firstName: 'Dev',
        lastName: 'User',
        schoolId: school.id,
        type:UserType.STUDENT
    });

    const classroom = classroomRepo.create({
        id: 'dev-classroom',
        name: 'Dev Classroom',
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

    logger.info({ name: 'seedDevUser' }, `email=${DEV_EMAIL} pass=${DEV_PASSWORD}`);
};

export const seedDevData = async (): Promise<void> => {
    if (currentEnvIsNotDev()) {
        logger.info({ name: 'seedDevData' }, 'skip: not in development environment')
        return
    }

    if (await devDataAlreadySeeded()) {
        logger.info({ name: 'seedDevData' }, 'skip: already seeded')
        return
    }

    await seedDevUser()
    await setDevDataSeededFlag()
}

