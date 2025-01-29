import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common'
import { PuId } from '../common/id-generator'

export type SchoolId = PuId

export enum SchoolSemesters {
    FIRST = 'FIRST',
    SECOND = 'SECOND',
}

export const School = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
})

export type School = Static<typeof School>
