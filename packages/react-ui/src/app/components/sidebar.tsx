import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { t } from 'i18next'
import { FileTextIcon, LockKeyhole } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { flagsHooks } from '@/hooks/flags-hooks'

type Link = {
    icon: React.ReactNode
    label: string
    to: string
    notification?: boolean
}

type CustomTooltipLinkProps = {
    to: string
    label: string
    Icon: React.ElementType
    extraClasses?: string
    notification?: boolean
    locked?: boolean
    newWindow?: boolean
}
const CustomTooltipLink = ({
    to,
    label,
    Icon,
    extraClasses,
    notification,
    locked,
    newWindow,
}: CustomTooltipLinkProps) => {
    const location = useLocation()

    const isActive = location.pathname.startsWith(to)

    return (
        <Link
            to={to}
            target={newWindow ? '_blank' : ''}
            rel={newWindow ? 'noopener noreferrer' : ''}
            className={`flex flex-col items-start justify-start rounded-sm ${
                isActive ? 'bg-primary text-white' : 'hover:bg-accent'
            } ${extraClasses || ''}`}
        >
            <div className={`relative flex items-center justify-center gap-1`}>
                {locked && (
                    <LockKeyhole
                        className="absolute right-[-1px] bottom-[20px] size-3"
                        color="grey"
                    />
                )}
                <Icon
                    className={`size-10 p-2.5 rounded-lg transition-colors `}
                />
                <span className="text-[15px]">{label}</span>
                {notification && (
                    <span className="bg-destructive absolute right-[1px] top-[3px] size-2 rounded-full"></span>
                )}
            </div>
        </Link>
    )
}

export type SidebarLink = {
    to: string
    label: string
    icon: React.ElementType
    notification?: boolean
    locked?: boolean
}

type SidebarProps = {
    children: React.ReactNode
    links: SidebarLink[]
    isHomeDashboard?: boolean
    hideSideNav?: boolean
}
export function Sidebar({
    children,
    links,
    isHomeDashboard = false,
    hideSideNav = false,
}: SidebarProps) {
    const branding = flagsHooks.useWebsiteBranding()

    return (
        <div>
            <div className="flex min-h-screen w-full  ">
                {!hideSideNav && (
                    <aside className=" border-r sticky  top-0 h-screen bg-muted/50 w-[260px] ">
                        <ScrollArea>
                            <nav className="flex flex-col  h-screen  sm:py-5  gap-4 px-4">
                                <Link
                                    to="/home"
                                    className="h-[48px] items-center justify-center "
                                >
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={
                                                        branding.logos
                                                            .logoIconUrl
                                                    }
                                                    alt={t('home')}
                                                    width={50}
                                                    height={50}
                                                />
                                                <span className="text-[24px]">
                                                    {branding.websiteName}
                                                </span>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            {t('Home')}
                                        </TooltipContent>
                                    </Tooltip>
                                </Link>

                                {links.map((link, index) => (
                                    <CustomTooltipLink
                                        to={link.to}
                                        label={link.label}
                                        Icon={link.icon}
                                        key={index}
                                        notification={link.notification}
                                        locked={link.locked}
                                    />
                                ))}

                                <div className="grow"></div>
                                {isHomeDashboard && (
                                    <>
                                        <CustomTooltipLink
                                            to={'https://google.com'}
                                            label={t('Support')}
                                            Icon={QuestionMarkCircledIcon}
                                            newWindow={true}
                                        />
                                        <CustomTooltipLink
                                            to="https://google.com/"
                                            label={t('Docs')}
                                            Icon={FileTextIcon}
                                            newWindow={true}
                                        />
                                    </>
                                )}
                            </nav>
                        </ScrollArea>
                    </aside>
                )}
                <div className="flex-1 py-8 p-4">
                    <div className="flex flex-col">
                        <div className="container mx-auto flex ">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
