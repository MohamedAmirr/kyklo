import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '@pickup/shared'

export const DepartmentStaff = Type.Object({
    ...BaseModelSchema,
    departmentId: Type.String(),
    staffId: Type.String(),
    isHead: Type.Boolean(),
})

export type DepartmentStaff = Static<typeof DepartmentStaff>
