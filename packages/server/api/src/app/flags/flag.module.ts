import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { flagController } from './flags.controller'

export const flagModule: FastifyPluginAsyncTypebox = async (app) => {
    await app.register(flagController, { prefix: '/api/v1/flags' })
}

