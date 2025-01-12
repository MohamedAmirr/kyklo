import dns from 'node:dns/promises'
import { system } from './system/system'
import { SharedSystemProp } from './system/system-prop'
import { PuEnvironment } from '@pickup/shared'

const GOOGLE_DNS = '216.239.32.10'
const PUBLIC_IP_ADDRESS_QUERY = 'o-o.myaddr.l.google.com'

type IpMetadata = {
    ip: string
}

let ipMetadata: IpMetadata | undefined

const getPublicIp = async (): Promise<IpMetadata> => {
    if (ipMetadata !== undefined) {
        return ipMetadata
    }

    dns.setServers([GOOGLE_DNS])

    const ipList = await dns.resolve(PUBLIC_IP_ADDRESS_QUERY, 'TXT')

    ipMetadata = {
        ip: ipList[0][0],
    }

    return ipMetadata
}

const appendSlashAndApi = (url: string): string => {
    const slash = url.endsWith('/') ? '' : '/'
    return `${url}${slash}api/`
}

const getInternalApiUrl = (): string => {
    if (system.isApp()) {
        return 'http://127.0.0.1:3000/'
    }
    const url = system.getOrThrow(SharedSystemProp.FRONTEND_URL)
    return appendSlashAndApi(url)
}

const getPublicUrl = async (): Promise<string> => {
    const environment = system.getOrThrow<PuEnvironment>(SharedSystemProp.ENVIRONMENT)
    let url = system.getOrThrow(SharedSystemProp.FRONTEND_URL)
    
    if (extractHostname(url) === 'localhost' && environment === PuEnvironment.PRODUCTION) {
        url = `http://${(await getPublicIp()).ip}`
    }

    return appendSlashAndApi(url)
}



function extractHostname(url: string): string | null {
    try {
        const hostname = new URL(url).hostname
        return hostname
    }
    catch (e) {
        return null
    }
}

export const networkUtls = {
    getPublicUrl,
    getInternalApiUrl,
    getPublicIp,
}