import { Static, Type } from '@sinclair/typebox'
import { customAlphabet } from 'nanoid'

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const ID_LENGTH = 21

export const PuId = Type.String({
    pattern: `^[0-9a-zA-Z]{${ID_LENGTH}}$`,
})

export type PuId = Static<typeof PuId>

export const puId = customAlphabet(ALPHABET, ID_LENGTH)

export const securePuId = (length: number) => customAlphabet(ALPHABET, length)()
