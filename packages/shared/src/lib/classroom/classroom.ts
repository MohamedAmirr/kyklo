import { Static, Type } from '@sinclair/typebox';
import { BaseModelSchema, Nullable, PuId } from '@pickup/shared';
import { ClassroomMemberRole } from './classroom-member';
import { SAFE_STRING_PATTERN } from '../common';

export const ListProjectRequestForUserQueryParams = Type.Object({
    cursor: Type.Optional(Type.String()),
    limit: Type.Optional(Type.Number()),
})

export type ListProjectRequestForUserQueryParams = Static<typeof ListProjectRequestForUserQueryParams>

export type ClassroomId = PuId;

export type ClassroomPlanId = string;

export const SwitchClassroomResponse = Type.Object({
    token: Type.String(),
    classroomRole: Type.Union([Type.Enum(ClassroomMemberRole), Type.Null()]),
})

export type SwitchClassroomResponse = Static<typeof SwitchClassroomResponse>


export const Classroom = Type.Object({
    ...BaseModelSchema,
    deleted: Nullable(Type.String()),
    ownerId: Type.String(),
    displayName: Type.String(),
    platformId: PuId,
})

export type Classroom = Static<typeof Classroom>

export const ActiveClassroom = Type.Omit(Classroom, ['deleted'])

export type ActiveClassroom = Static<typeof ActiveClassroom>

export const UpdateClassroomBody = Type.Object({
    displayName: Type.Optional(Type.String({
        pattern: SAFE_STRING_PATTERN,
    })),
})

export type UpdateClassroomBody = Static<typeof UpdateClassroomBody>
