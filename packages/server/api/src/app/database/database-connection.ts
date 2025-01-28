import {
    AppSystemProp,
    DatabaseType,
    SharedSystemProp,
    system,
} from '@pickup/server-shared'
import { isNil, PuEdition, PuEnvironment } from '@pickup/shared'
import {
    ArrayContains,
    DataSource,
    EntitySchema,
    ObjectLiteral,
    SelectQueryBuilder,
} from 'typeorm'
import { OtpEntity } from '../otp/otp-entity'
import { createPostgresDataSource } from './postgres-connection'
import { FlagEntity } from '../flags/flag.entity'
import { ClassroomEntity } from '../classroom/classroom.entity'
import { StudentEntity } from '../student/student.entity'
import { EventEntity } from '../event/event.entity'
import { UserEntity } from '../user/user.entity'
import { SchoolEntity } from '../school/school.entity'
import { ComplaintsEntity } from '../complaint/complaint.entity'
import { ClassroomMemberEntity } from '../classroom-members/classroom-member.entity'
import { CategoriesEntity } from '../category/category.entity'
import {
    DepartmentEntity,
    DepartmentStaffEntity,
} from '../department/department.entity'
import { SubjectEntity } from '../subject/subject.entity'

function getEntities(): EntitySchema<unknown>[] {
    const edition = system.getEdition()

    const entities: EntitySchema[] = [
        FlagEntity,
        UserEntity,
        SchoolEntity,
        ClassroomEntity,
        ClassroomMemberEntity,
        StudentEntity,
        EventEntity,
        CategoriesEntity,
        ComplaintsEntity,
        DepartmentEntity,
        DepartmentStaffEntity,
        SubjectEntity,
    ]

    switch (edition) {
        case PuEdition.ENTERPRISE:
            entities.push(OtpEntity)
            break
        case PuEdition.COMMUNITY:
            break
        default:
            throw new Error(`Unsupported edition: ${edition}`)
    }

    return entities
}

const getSynchronize = (): boolean => {
    const env = system.getOrThrow<PuEnvironment>(SharedSystemProp.ENVIRONMENT)

    return env !== PuEnvironment.PRODUCTION
}

export const commonProperties = {
    subscribers: [],
    entities: getEntities(),
    synchronize: getSynchronize(),
}

let _databaseConnection: DataSource | null = null

export const databaseConnection = () => {
    if (isNil(_databaseConnection)) {
        _databaseConnection = createPostgresDataSource()
    }
    return _databaseConnection
}

export function APArrayContains<T extends ObjectLiteral>(
    columnName: string,
    values: string[],
    query: SelectQueryBuilder<T>
): SelectQueryBuilder<T> {
    const databaseType = system.get(AppSystemProp.DB_TYPE)
    switch (databaseType) {
        case DatabaseType.POSTGRES:
            return query.andWhere({
                [columnName]: ArrayContains(values),
            })
        case DatabaseType.SQLITE3: {
            const likeConditions = values
                .map((tag, index) => `flow_run.tags LIKE :tag${index}`)
                .join(' AND ')
            const likeParams = values.reduce((params, tag, index) => {
                return {
                    ...params,
                    [`tag${index}`]: `%${tag}%`,
                }
            }, {})
            return query.andWhere(likeConditions, likeParams)
        }
        default:
            throw new Error(`Unsupported database type: ${databaseType}`)
    }
}

// Uncomment the below line when running `nx db-migration server-api name=<MIGRATION_NAME>` and recomment it after the migration is generated
// export const exportedConnection = databaseConnection()
