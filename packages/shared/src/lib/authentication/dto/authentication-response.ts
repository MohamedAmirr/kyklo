import { ClassroomMemberRole } from '../../classroom'
import { User } from '../../user/user'

export type UserWithoutPassword = Omit<User, 'password'>

export type AuthenticationResponse = UserWithoutPassword & {
    token: string
    classroomId: string
}