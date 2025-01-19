import 'fastify';

declare module 'fastify' {
    interface FastifyReply {
        responseCode?: string;
    }
}
