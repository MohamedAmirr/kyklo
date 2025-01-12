import { Type, Static } from "@sinclair/typebox";

export const ListClassroomMembersRequestQuery = Type.Object({
    classroomId: Type.String(),
    classroomRoleId: Type.Optional(Type.String()),
    cursor: Type.Optional(Type.String()),
    limit: Type.Optional(Type.Number()),
});

export type ListClassroomMembersRequestQuery = Static<typeof ListClassroomMembersRequestQuery>;

export const UpdateClassroomMemberRoleRequestBody = Type.Object({
    role: Type.String(),
})

export type UpdateClassroomMemberRoleRequestBody = Static<typeof UpdateClassroomMemberRoleRequestBody>