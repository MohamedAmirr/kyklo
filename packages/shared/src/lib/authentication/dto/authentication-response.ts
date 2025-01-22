import { Static, Type } from '@sinclair/typebox'
import { User } from '../../user'

export const UserWithoutPassword = Type.Omit(User, ['password'])
export type UserWithoutPassword = Static<typeof UserWithoutPassword>

export const AuthenticationResponse = Type.Composite([
    UserWithoutPassword,
    Type.Object({
        token: Type.String(),
        classroomId: Type.String(),
    }),
])
export type AuthenticationResponse = Static<typeof AuthenticationResponse>
