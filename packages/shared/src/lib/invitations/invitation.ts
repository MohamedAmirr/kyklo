import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema, Nullable, NullableEnum } from '../common'
import { ClassroomRole } from '../classroom-role/classroom-role'

export enum InvitationType {
    STAFF = 'STAFF',
    CLASSROOM = 'CLASSROOM',
}

export enum InvitationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
}

export const SMTPInformation = Type.Object({
    user: Type.String(),
    senderEmail: Type.String(),
    senderName: Type.String(),
    password: Type.String(),
    host: Type.String(),
    port: Type.Number(),
})

export type SMTPInformation = Static<typeof SMTPInformation>

export const UserInvitation = Type.Object({
    ...BaseModelSchema,
    email: Type.String(),
    status: Type.Enum(InvitationStatus),
    type: Type.Enum(InvitationType),
    platformId: Type.String(),
    platformRole: NullableEnum(Type.Enum(ClassroomRole)),
    projectId: Nullable(Type.String()),
    classroomId: Nullable(Type.String()),
    classroomRole: Nullable(Type.Enum(ClassroomRole)),
})

export type UserInvitation = Static<typeof UserInvitation>

export const UserInvitationWithLink = Type.Composite([UserInvitation, Type.Object({
    link: Type.Optional(Type.String()),
})])

export type UserInvitationWithLink = Static<typeof UserInvitationWithLink>

export const SendUserInvitationRequest = Type.Union([
    Type.Object({
        type: Type.Literal(InvitationType.CLASSROOM),
        email: Type.String(),
        classroomId: Type.String(),
        classroomRole: Type.Enum(ClassroomRole),
    }),
    Type.Object({
        type: Type.Literal(InvitationType.STAFF),
        email: Type.String(),
        classroomRole: Type.Enum(ClassroomRole),
    }),
])


export type SendUserInvitationRequest = Static<typeof SendUserInvitationRequest>

export const AcceptUserInvitationRequest = Type.Object({
    invitationToken: Type.String(),
})

export type AcceptUserInvitationRequest = Static<typeof AcceptUserInvitationRequest>

export const ListUserInvitationsRequest = Type.Object({
    limit: Type.Optional(Type.Number()),
    cursor: Type.Optional(Type.String()),
    type: Type.Enum(InvitationType),
    projectId: Nullable(Type.String()),
    status: Type.Optional(Type.Enum(InvitationStatus)),
})

export type ListUserInvitationsRequest = Static<typeof ListUserInvitationsRequest>
