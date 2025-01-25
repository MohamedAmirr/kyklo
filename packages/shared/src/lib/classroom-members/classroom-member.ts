import { Static, Type } from "@sinclair/typebox";
import { PuId, BaseModelSchema, UserMeta } from "@pickup/shared";

export type ClassroomMemberId = string;

export const ClassroomMember = Type.Object({
    ...BaseModelSchema,
    schoolId: PuId,
    userId: PuId,
    classroomId: Type.String(),
}, {
    description: "Classroom member is which user is assigned to a classroom."
});

export type ClassroomMember = Static<typeof ClassroomMember>;

export const ClassroomMemberWithUser = Type.Composite([ClassroomMember, Type.Object({
    user: UserMeta,
})])

export type ClassroomMemberWithUser = Static<typeof ClassroomMemberWithUser>;
