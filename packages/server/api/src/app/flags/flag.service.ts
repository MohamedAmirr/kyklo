import { SharedSystemProp, system } from '@pickup/server-shared'
import { PuFlagId, Flag } from '@pickup/shared'
import { In } from 'typeorm'
import { repoFactory } from '../core/db/repo-factory'
import { FlagEntity } from './flag.entity'
import { defaultTheme } from './theme'

const flagRepo = repoFactory(FlagEntity)

export const flagService = {
    save: async (flag: FlagType): Promise<Flag> => {
        return flagRepo().save({
            id: flag.id,
            value: flag.value,
        })
    },
    async getOne(flagId: PuFlagId): Promise<Flag | null> {
        return flagRepo().findOneBy({ id: flagId })
    },
    async getAll(): Promise<Flag[]> {
        const flags = await flagRepo().findBy({
            id: In([
                PuFlagId.EDITION,
                PuFlagId.FRONTEND_URL,
                PuFlagId.THEME,
            ]),
        })
        const now = new Date().toISOString()
        const created = now
        const updated = now
        flags.push(
            {
                id: PuFlagId.EDITION,
                value: system.getEdition(),
                created,
                updated,
            },
            {
                id: PuFlagId.THEME,
                value: defaultTheme,
                created,
                updated,
            },
            {
                id: PuFlagId.FRONTEND_URL,
                value: system.get(SharedSystemProp.FRONTEND_URL),
                created,
                updated,
            },
        )

        return flags
    },
}

export type FlagType =
    | BaseFlagStructure<PuFlagId.FRONTEND_URL, string>

type BaseFlagStructure<K extends PuFlagId, V> = {
    id: K
    value: V
}