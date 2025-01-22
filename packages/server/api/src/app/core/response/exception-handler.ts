import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ErrorCode, PickUpError } from '@pickup/shared';

export function setupGlobalErrorHandler(app: FastifyInstance): void {
    app.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
        console.log('error', error);
        if (error instanceof PickUpError) {
            reply.responseCode = error.error.code;
        } else if (error.validation) {
            reply.responseCode = ErrorCode.VALIDATION;
        } else{
            reply.responseCode = error.code;
        }

        app.log.error(error);

        reply.status(500).send({message: error.message});
    });
}
