import { assertNotNullOrUndefined } from '@pickup/shared'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const passwordHasher = {
    hash: async (plainTextPassword: string): Promise<string> => {
        return bcrypt.hash(plainTextPassword, SALT_ROUNDS)
    },

    compare: async (
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean> => {
        assertNotNullOrUndefined(plainTextPassword, 'plainTextPassword')
        assertNotNullOrUndefined(hashedPassword, 'hashedPassword')
        return bcrypt.compare(plainTextPassword, hashedPassword)
    },
}