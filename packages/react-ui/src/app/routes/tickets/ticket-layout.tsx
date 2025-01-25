import { t } from 'i18next'
import { Settings, SunMoon } from 'lucide-react'

import SidebarLayout, {
    SideBarContent,
    SidebarItem,
} from '@/app/components/sidebar-layout'

import { TicketHeader } from './ticket-header'
import { TicketPage } from '.'

const iconSize = 20

export default function TicketLayout() {
    const sidebarNavItems: SidebarItem[] = [
        {
            title: t('Ticket List'),
            href: '/tickets/list',
            icon: <Settings size={iconSize} />,
        },
        {
            title: t('Support Category'),
            href: '/tickets/category',
            icon: <SunMoon size={iconSize} />,
        },
    ]

    const sidebarNavContent: SideBarContent[] = [
        {
            href: '/tickets/list',
            content: <TicketPage />,
        },
        {
            href: '/tickets/category',
            content: <div>Litsting and creating a new category</div>,
        },
    ]

    return (
        <div className="flex flex-col w-full">
            <TicketHeader />
            <SidebarLayout
                items={sidebarNavItems}
                content={sidebarNavContent}
            />
        </div>
    )
}
