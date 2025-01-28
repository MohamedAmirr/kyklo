import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema, PuId } from '@pickup/shared'

export const DepartmentStaff = Type.Object({
    ...BaseModelSchema,
    departmentId: Type.String(),
    staffId: PuId,
    isHead: Type.Boolean(),
})

export type DepartmentStaff = Static<typeof DepartmentStaff>
