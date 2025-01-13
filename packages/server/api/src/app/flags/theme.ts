import tinycolor from 'tinycolor2'

function generateColorVariations(defaultColor: string) {
    const defaultColorObj = tinycolor(defaultColor)

    const darkColor = defaultColorObj.clone().darken(2)
    const baseLight = tinycolor('#ffffff')
    const lightColor = tinycolor
        .mix(baseLight, defaultColorObj.toHex(), 12)
        .toHexString()
    const mediumColor = defaultColorObj.clone().lighten(26)

    return {
        default: defaultColorObj.toHexString(),
        dark: darkColor.toHexString(),
        light: lightColor,
        medium: mediumColor.toHexString(),
    }
}

function generateSelectionColor(defaultColor: string) {
    const defaultColorObj = tinycolor(defaultColor)
    const lightColor = defaultColorObj.lighten(8)
    return lightColor.toHexString()
}

// TODO: CHANGE THIS TO PICKUP BRANDING
export function generateTheme({
    primaryColor,
    fullLogoUrl,
    favIconUrl,
    logoIconUrl,
    websiteName,
}: {
    primaryColor: string
    fullLogoUrl: string
    favIconUrl: string
    logoIconUrl: string
    websiteName: string
}) {
    return {
        websiteName,
        colors: {
            avatar: '#515151',
            'blue-link': '#1890ff',
            danger: '#f94949',
            primary: generateColorVariations(primaryColor),
            warn: {
                default: '#f78a3b',
                light: '#fff6e4',
                dark: '#cc8805',
            },
            success: {
                default: '#14ae5c',
                light: '#3cad71',
            },
            selection: generateSelectionColor(primaryColor),
        },
        logos: {
            fullLogoUrl,
            favIconUrl,
            logoIconUrl,
        },
    }
}

// TODO: CHANGE THIS TO PICKUP BRANDING
export const defaultTheme = generateTheme({
    primaryColor: '#0C4ADD',
    websiteName: 'Pickup',
    fullLogoUrl: 'https://t3.ftcdn.net/jpg/04/75/27/54/360_F_475275443_DDUSHFWRuBsgEhK5n40s6MfTh60E3sV3.jpg',
    favIconUrl: 'https://t3.ftcdn.net/jpg/04/75/27/54/360_F_475275443_DDUSHFWRuBsgEhK5n40s6MfTh60E3sV3.jpg',
    logoIconUrl: 'https://t3.ftcdn.net/jpg/04/75/27/54/360_F_475275443_DDUSHFWRuBsgEhK5n40s6MfTh60E3sV3.jpg',
})
