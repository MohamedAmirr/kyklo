import { Static, Type } from '@sinclair/typebox'
import { LocalesEnum } from '../common'
import { BaseModelSchema } from '../common/base-model'
import { PuId } from '../common/id-generator'
import { SMTPInformation } from '../invitations'

export type PlatformId = PuId

export const Platform = Type.Object({
    ...BaseModelSchema,
    ownerId: PuId,
    name: Type.String(),
    primaryColor: Type.String(),
    logoIconUrl: Type.String(),
    fullLogoUrl: Type.String(),
    favIconUrl: Type.String(),
    smtp: Type.Optional(SMTPInformation),
    auditLogEnabled: Type.Boolean(),
    customAppearanceEnabled: Type.Boolean(),
    classroomRolesEnabled: Type.Boolean(),
    alertsEnabled: Type.Boolean(),
    defaultLocale: Type.Optional(Type.Enum(LocalesEnum)),
    licenseKey: Type.Optional(Type.String()),
})

export type Platform = Static<typeof Platform>