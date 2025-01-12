import { Static, Type } from "@sinclair/typebox";

export const UpdatePlatformClassroomBody = Type.Object({
    displayName: Type.Optional(Type.String()),
})

export type UpdatePlatformClassroomBody = Static<typeof UpdatePlatformClassroomBody>;

export const CreatePlatformClassroomBody = Type.Object({
    displayName: Type.String(),
})

export type CreatePlatformClassroomBody = Static<typeof CreatePlatformClassroomBody>;
