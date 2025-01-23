import { logger, rejectedPromiseHandler, SharedSystemProp, system } from '@pickup/server-shared'
import { FastifyInstance, FastifyRequest, HTTPMethods } from 'fastify'
import fastifySocketIO from 'fastify-socket.io'
import { Socket } from 'socket.io'
import { accessTokenManager } from './authentication/lib/access-token-manager'
import { securityHandlerChain } from './core/security/security-handler-chain'
import { websocketService } from './websockets/websockets.service'
import { openapiModule } from './helper/openapi/openapi.module'
import { validateEnvPropsOnStartup } from './helper/system-validator'
import { flagModule } from './flags/flag.module'
import { PuEdition, PuEnvironment } from '@pickup/shared'
import { authenticationModule } from './authentication/authentication.module'
import { classroomModule } from './classroom/classroom.module'
import { studentModule } from './student/student.module'
import { setupGlobalErrorHandler } from './core/response/exception-handler'
import addGlobalResponseFormat from './core/response/response-hook'
import { eventModule } from './event/event.module'

export const setupApp = async (app: FastifyInstance): Promise<FastifyInstance> => {

    setupGlobalErrorHandler(app)
    app.decorateReply('responseCode')
    addGlobalResponseFormat(app);

    await app.register(fastifySocketIO, {
        cors: {
            origin: '*',
        },
        transports: ['websocket'],
    })

    app.io.use((socket: Socket, next: (err?: Error) => void) => {
        accessTokenManager
            .verifyPrincipal(socket.handshake.auth.token)
            .then(() => {
                next()
            })
            .catch(() => {
                next(new Error('Authentication error'))
            })
    })

    app.io.on('connection', (socket: Socket) => {
        rejectedPromiseHandler(websocketService.init(socket))
    })

    app.addHook('onRequest', async (request, reply) => {
        const route = app.hasRoute({
            method: request.method as HTTPMethods,
            url: request.url,
        })
        if (!route) {
            return reply.code(404).send({
                statusCode: 404,
                error: 'Not Found',
                message: 'Route not found',
            })
        }
    })

    app.addHook('preHandler', securityHandlerChain)

    await app.register(openapiModule)
    await app.register(flagModule)
    await app.register(authenticationModule)
    await app.register(classroomModule)
    await app.register(studentModule)
    await app.register(eventModule)

    app.get(
        '/redirect',
        async (
            request: FastifyRequest<{ Querystring: { code: string } }>,
            reply,
        ) => {
            const params = {
                code: request.query.code,
            }
            if (!params.code) {
                return reply.send('The code is missing in url')
            }
            else {
                return reply
                    .type('text/html')
                    .send(
                        `<script>if(window.opener){window.opener.postMessage({ 'code': '${encodeURIComponent(
                            params.code,
                        )}' },'*')}</script> <html>Redirect succuesfully, this window should close now</html>`,
                    )
            }
        },
    )

    await validateEnvPropsOnStartup()

    const edition = system.getEdition()
    logger.info({
        edition,
    }, 'Pickup Edition')
    switch (edition) {
        case PuEdition.COMMUNITY:
            break
        case PuEdition.ENTERPRISE:
            break
    }

    app.addHook('onClose', async () => {
        logger.info('Shutting down')
    })

    return app
}


export async function appPostBoot(): Promise<void> {
    logger.info(`

    ░█▀█░▀█▀░█▀▀░█░█░█░█░█▀█
    ░█▀▀░░█░░█░░░█▀▄░█░█░█▀▀
    ░▀░░░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀░░

    ==========================================
    The application started on ${system.get(SharedSystemProp.FRONTEND_URL)}
    ==========================================`)

    const environment = system.get(SharedSystemProp.ENVIRONMENT)
    if (environment === PuEnvironment.DEVELOPMENT) {
        logger.warn(
            `[WARNING]: The application is running in ${environment} mode.`,
        )
    }
}
