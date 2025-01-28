import { Static, Type } from '@sinclair/typebox'

export const SchoolStageType = Type.Enum({
    KEY_STAGE: 'Key Stage',
    CYCLE: 'Cycle',
    EDUCATIONAL_PHASE: 'Educational Phase',
    GRADE_GROUP: 'Grade Group',
    SCHOOL_STAGE: 'School Stage',
    EARLY_EDUCATION: 'Early Education',
    SECONDARY_EDUCATION: 'Secondary Education',
    POST_SECONDARY: 'Post-Secondary',
})

export const SchoolStage = Type.Object({
    name: Type.String(),
    ageRange: Type.Optional(Type.String()),
    levelType: SchoolStageType,
})

export type SchoolStage = Static<typeof SchoolStage>
