import { Static, Type } from "@sinclair/typebox";
import { BaseModelSchema, ClassroomRole, PuId, UserMeta } from "@pickup/shared";

export type ClassroomMemberId = string;

export const ClassroomMember = Type.Object({
    ...BaseModelSchema,
    platformId: PuId,
    userId: PuId,
    classroomId: Type.String(),
    classroomRoleId: PuId,
}, {
    description: "Classroom member is which user is assigned to a classroom."
});

export type ClassroomMember = Static<typeof ClassroomMember>;

export const ClassroomMemberWithUser = Type.Composite([ClassroomMember, Type.Object({
    user: UserMeta,
    classroomRole: ClassroomRole,
})])

export type ClassroomMemberWithUser = Static<typeof ClassroomMemberWithUser>;