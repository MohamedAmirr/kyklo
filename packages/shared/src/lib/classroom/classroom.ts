import { Static, Type } from '@sinclair/typebox'
import { BaseModelSchema } from '../common/base-model'
import { PuId } from '../common/id-generator'

export type ClassroomId = PuId

export const Classroom = Type.Object({
    ...BaseModelSchema,
    name: Type.String(),
})

export type Classroom = Static<typeof Classroom>