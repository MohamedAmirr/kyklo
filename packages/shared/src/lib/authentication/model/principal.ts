import { PuId } from '../../common/id-generator'
import { SchoolId } from '../../school'
import { PrincipalType } from './principal-type'

export type Principal = {
    id: PuId
    type: PrincipalType
    schoolId: SchoolId
}