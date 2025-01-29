import { logger, SharedSystemProp, system } from '@pickup/server-shared'
import { PuEnvironment } from '@pickup/shared'
import { databaseConnection } from '../database-connection'
import { FlagEntity } from '../../flags/flag.entity'
import { seedDevComplaints } from '../../complaint/seeders/complaint.seeder'
import { seedDevSchoolGrades } from '../../SchoolGrade/seeders/school-grade.seeder'
import { seedDevSchool } from '../../school/seeders/school.seeder'
import { seedDevDepartments } from '../../department/seeders/department.seeder'
import { seedDevSubjects } from '../../subject/seeders/subject.seeder'
import { seedDevUsers } from '../../user/seeders/user.seeder'
import { seedDevClassrooms } from '../../classroom/seeders/classroom.seeder'
import { seedDevStudents } from '../../student/seeders/student.seeder'
import { seedDevCategories } from '../../category/seeders/category.seeder'

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

    await seedDevSchool()
    await seedDevUsers()
    await seedDevSchoolGrades()
    await seedDevDepartments()
    await seedDevSubjects()
    await seedDevClassrooms()
    await seedDevStudents()
    await seedDevCategories()
    await seedDevComplaints()
    await setDevDataSeededFlag()
}
