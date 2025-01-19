import { PuId } from '../../common/id-generator'
import { SchoolId } from '../../school'
import { UserType } from '../../user'

export type Principal = {
    id: PuId
    type: UserType
    schoolId: SchoolId
}