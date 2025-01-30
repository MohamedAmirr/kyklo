import { SchoolGradeEntity, SchoolStageEntity } from '../school-grade.entity'
import { puId, SchoolStageType } from '@pickup/shared'
import { databaseConnection } from '../../database/database-connection'
import { SchoolEntity } from '../../school/school.entity'
import { getRandomEntity } from '../../helper/random-entity'

async function seedSchoolGrades() {
    const randomSchool = await getRandomEntity(SchoolEntity, 'school-grade')

    const schoolStageRepo =
        databaseConnection().getRepository(SchoolStageEntity)

    const schoolGradeRepo =
        databaseConnection().getRepository(SchoolGradeEntity)

    const primaryStage = schoolStageRepo.create({
        id: puId(),
        name: 'Primary School',
        ageRange: '6-11',
        levelType: SchoolStageType.GRADE_GROUP,
    })

    await schoolStageRepo.save(primaryStage)

    const middleStage = schoolStageRepo.create({
        id: puId(),
        name: 'Middle School',
        ageRange: '12-14',
        levelType: SchoolStageType.GRADE_GROUP,
    })

    await schoolStageRepo.save(middleStage)

    const highStage = schoolStageRepo.create({
        id: puId(),
        name: 'High School',
        ageRange: '15-17',
        levelType: SchoolStageType.GRADE_GROUP,
    })

    await schoolStageRepo.save(highStage)

    const schoolGrades = [
        {
            id: puId(),
            name: 'Grade 1',
            schoolStageId: primaryStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 2',
            schoolStageId: primaryStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 3',
            schoolStageId: primaryStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 4',
            schoolStageId: primaryStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 5',
            schoolStageId: primaryStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 6',
            schoolStageId: primaryStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 7',
            schoolStageId: middleStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 8',
            schoolStageId: middleStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 9',
            schoolStageId: middleStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 10',
            schoolStageId: highStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 11',
            schoolStageId: highStage.id,
            schoolId: randomSchool.id,
        },
        {
            id: puId(),
            name: 'Grade 12',
            schoolStageId: highStage.id,
            schoolId: randomSchool.id,
        },
    ]

    for (const grade of schoolGrades) {
        const schoolGrade = schoolGradeRepo.create(grade)
        await schoolGradeRepo.save(schoolGrade)
    }
}

export async function seedDevSchoolGrades() {
    try {
        await seedSchoolGrades()
        console.log('✅ School grades seeded successfully!')
    } catch (error) {
        console.error('🚨 Error during school grades seeding:', error)
    }
}
