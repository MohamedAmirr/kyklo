import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common/base-model'
import { PuId } from '../common/id-generator'

export type SchoolId = PuId

export enum SchoolGrades {
    FIRST = 'FIRST',
    SECOND = 'SECOND',
    THIRD = 'THIRD',
    FOURTH = 'FOURTH',
    FIFTH = 'FIFTH',
    SIXTH = 'SIXTH',
    SEVENTH = 'SEVENTH',
    EIGHTH = 'EIGHTH',
    NINTH = 'NINTH',
    TENTH = 'TENTH',
    ELEVENTH = 'ELEVENTH',
    TWELFTH = 'TWELFTH',
}

export enum SchoolSemesters {
    FIRST = 'FIRST',
    SECOND = 'SECOND',
}

export const School = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
})

export type School = Static<typeof School>
