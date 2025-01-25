import { Static, Type } from '@sinclair/typebox'

export const PuMultipartFile = Type.Object({
    filename: Type.String(),
    data: Type.Unknown(),
    type: Type.Literal('file'),
})

export type PuMultipartFile = Static<typeof PuMultipartFile> & {
    data: Buffer
}

export const isMultipartFile = (value: unknown): value is PuMultipartFile => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'type' in value &&
        value.type === 'file' &&
        'filename' in value &&
        'data' in value &&
        value.data instanceof Buffer
    )
}
