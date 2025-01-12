import { Static, Type } from '@sinclair/typebox'
import { LocalesEnum } from '../common'
import { PuId } from '../common/id-generator'

export const UpdatePlatformRequestBody = Type.Object({
    name: Type.Optional(Type.String()),
    primaryColor: Type.Optional(Type.String()),
    logoIconUrl: Type.Optional(Type.String()),
    fullLogoUrl: Type.Optional(Type.String()),
    favIconUrl: Type.Optional(Type.String()),
    defaultLocale: Type.Optional(Type.Enum(LocalesEnum)),
})

export type UpdatePlatformRequestBody = Static<typeof UpdatePlatformRequestBody>

export const AdminAddPlatformRequestBody = Type.Object({
    userId: PuId,
    classroomId: PuId,
    name: Type.String(),
})

export type AdminAddPlatformRequestBody = Static<typeof AdminAddPlatformRequestBody>
