import * as crypto from 'crypto'
import { assertNotNullOrUndefined } from '@pickup/shared'
import { Static, Type } from '@sinclair/typebox'

let secret: string | null
const algorithm = 'aes-256-cbc'
const ivLength = 16

export const EncryptedObject = Type.Composite([
    Type.Object({
        iv: Type.String(),
        data: Type.String(),
    }),
])
export type EncryptedObject = Static<typeof EncryptedObject>

function encryptString(inputString: string): EncryptedObject {
    const iv = crypto.randomBytes(ivLength) // Generate a random initialization vector
    assertNotNullOrUndefined(secret, 'secret')
    const key = Buffer.from(secret, 'binary')
    const cipher = crypto.createCipheriv(algorithm, key, iv) // Create a cipher with the key and initialization vector
    let encrypted = cipher.update(inputString, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return {
        iv: iv.toString('hex'),
        data: encrypted,
    }
}

function encryptObject(object: unknown): EncryptedObject {
    const objectString = JSON.stringify(object) // Convert the object to a JSON string
    return encryptString(objectString)
}

function decryptObject<T>(encryptedObject: EncryptedObject): T {
    const iv = Buffer.from(encryptedObject.iv, 'hex')
    const key = Buffer.from(secret!, 'binary')
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(encryptedObject.data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return JSON.parse(decrypted)
}
function decryptString(encryptedObject: EncryptedObject): string {
    const iv = Buffer.from(encryptedObject.iv, 'hex')
    const key = Buffer.from(secret!, 'binary')
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(encryptedObject.data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

function get16ByteKey(): string {
    assertNotNullOrUndefined(secret, 'secret is not defined')
    return secret
}

export const encryptUtils = {
    decryptString,
    decryptObject,
    encryptObject,
    encryptString,
    get16ByteKey,
}
