import { PuId } from '../../common/id-generator'
import { SchoolId } from '../../school'
import { UserType } from '../../user'
import { PrincipalType } from './principal-type'

export type Principal = {
    id: PuId
    type: PrincipalType
    role: UserType
    schoolId: SchoolId
}