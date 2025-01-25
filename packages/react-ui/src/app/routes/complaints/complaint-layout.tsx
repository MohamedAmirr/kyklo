import { t } from 'i18next'
import { Settings, SunMoon } from 'lucide-react'

import SidebarLayout, {
    SideBarContent,
    SidebarItem,
} from '@/app/components/sidebar-layout'

import { ComplaintHeader } from './complaint-header'
import { ComplaintPage } from '.'

const iconSize = 20

export default function ComplaintLayout() {
    const sidebarNavItems: SidebarItem[] = [
        {
            title: t('Complaint List'),
            href: '/complaints/list',
            icon: <Settings size={iconSize} />,
        },
        {
            title: t('Support Category'),
            href: '/complaints/category',
            icon: <SunMoon size={iconSize} />,
        },
    ]

    const sidebarNavContent: SideBarContent[] = [
        {
            href: '/complaints/list',
            content: <ComplaintPage />,
        },
        {
            href: '/complaints/category',
            content: <div>Litsting and creating a new category</div>,
        },
    ]

    return (
        <div className="flex flex-col w-full">
            <ComplaintHeader />
            <SidebarLayout
                items={sidebarNavItems}
                content={sidebarNavContent}
            />
        </div>
    )
}
