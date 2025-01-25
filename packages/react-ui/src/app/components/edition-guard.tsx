import { PuEdition, PuFlagId } from '@pickup/shared'

import { flagsHooks } from '@/hooks/flags-hooks'

type EditionGuardProps = {
    children: React.ReactNode
    allowedEditions: PuEdition[]
}

const EditionGuard = ({ children, allowedEditions }: EditionGuardProps) => {
    const { data: edition } = flagsHooks.useFlag<PuEdition>(PuFlagId.EDITION)

    if (!edition || !allowedEditions.includes(edition)) {
        return null
    }
    return children
}

EditionGuard.displayName = 'EditionGuard'
export { EditionGuard }
