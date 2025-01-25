import { ClassroomId } from '../../classroom'
import { PuId } from '../../common/id-generator'
import { SchoolId } from '../../school'
import { PrincipalType } from './principal-type'

export type Principal = {
    id: PuId
    type: PrincipalType
    classroomId: ClassroomId
    school: {
        id: SchoolId
    }
    tokenVersion?: string
}
