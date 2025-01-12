import { logger, SharedSystemProp, system } from '@pickup/server-shared'
import { PuEnvironment } from '@pickup/shared'

const currentEnvIsNotDev = (): boolean => {
    const env = system.get(SharedSystemProp.ENVIRONMENT)
    return env !== PuEnvironment.DEVELOPMENT
}

const seedDevUser = async (): Promise<void> => {
    const DEV_EMAIL = 'dev@ap.com'
    const DEV_PASSWORD = '12345678'

    //TODO INSERT DEV USER
    // await authenticationService.signUp({
    //     email: DEV_EMAIL,
    //     password: DEV_PASSWORD,
    //     firstName: 'Dev',
    //     lastName: 'User',
    //     verified: true,
    //     platformId: null,
    // })

    logger.info({ name: 'seedDevUser' }, `email=${DEV_EMAIL} pass=${DEV_PASSWORD}`)
}

export const seedDevData = async (): Promise<void> => {
    if (currentEnvIsNotDev()) {
        logger.info({ name: 'seedDevData' }, 'skip: not in development environment')
        return
    }

    await seedDevUser()
}
