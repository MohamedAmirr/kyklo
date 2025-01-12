import { ClassroomId } from '../../classroom/classroom'
import { PuId } from '../../common/id-generator'
import { PrincipalType } from './principal-type'

export type Principal = {
    id: PuId
    type: PrincipalType
    classroomId: ClassroomId
    platform: {
        id: PuId
    }
    tokenVersion?: string
}