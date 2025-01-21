import { FastifyInstance } from 'fastify'
import "@fastify/swagger";

export const openapiController = async (fastify: FastifyInstance) => {
    fastify.get('/', async () => {
        return JSON.stringify(fastify.swagger(), null, 2)
    })
}
