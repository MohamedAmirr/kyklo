import { TlsOptions } from 'node:tls'
import { AppSystemProp, SharedSystemProp, system } from '@pickup/server-shared'
import { isNil, PuEdition, PuEnvironment } from '@pickup/shared'
import { DataSource, MigrationInterface } from 'typeorm'
import { commonProperties } from './database-connection'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const getSslConfig = (): boolean | TlsOptions => {
    const useSsl = system.get(AppSystemProp.POSTGRES_USE_SSL)

    if (useSsl === 'true') {
        return {
            ca: system
                .get(AppSystemProp.POSTGRES_SSL_CA)
                ?.replace(/\\n/g, '\n'),
        }
    }

    return false
}

const getMigrations = (): (new () => MigrationInterface)[] => {
    const commonMigration = []

    const edition = system.getEdition()
    switch (edition) {
        case PuEdition.ENTERPRISE:
            // Push enterprise migrations here

            break
        case PuEdition.COMMUNITY:
            // Push community migrations here
            break
    }

    return []
}

const getMigrationConfig = (): MigrationConfig => {
    const env = system.getOrThrow<PuEnvironment>(SharedSystemProp.ENVIRONMENT)

    if (env === PuEnvironment.TESTING) {
        return {}
    }

    return {
        migrationsRun: true,
        migrationsTransactionMode: 'each',
        migrations: getMigrations(),
    }
}

export const createPostgresDataSource = (): DataSource => {
    const migrationConfig = getMigrationConfig()
    const url = system.get(AppSystemProp.POSTGRES_URL)

    if (!isNil(url)) {
        return new DataSource({
            type: 'postgres',
            url,
            ssl: getSslConfig(),
            namingStrategy: new SnakeNamingStrategy(),
            ...migrationConfig,
            ...commonProperties,
        })
    }

    const database = system.getOrThrow(AppSystemProp.POSTGRES_DATABASE)
    const host = system.getOrThrow(AppSystemProp.POSTGRES_HOST)
    const password = system.getOrThrow(AppSystemProp.POSTGRES_PASSWORD)
    const serializedPort = system.getOrThrow(AppSystemProp.POSTGRES_PORT)
    const port = Number.parseInt(serializedPort, 10)
    const username = system.getOrThrow(AppSystemProp.POSTGRES_USERNAME)

    return new DataSource({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        ssl: getSslConfig(),
        namingStrategy: new SnakeNamingStrategy(),
        ...migrationConfig,
        ...commonProperties,
    })
}

type MigrationConfig = {
    migrationsRun?: boolean
    migrationsTransactionMode?: 'all' | 'none' | 'each'
    migrations?: (new () => MigrationInterface)[]
}
