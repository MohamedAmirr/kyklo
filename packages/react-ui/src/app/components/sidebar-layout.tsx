import { Separator } from '@/components/ui/seperator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface SidebarLayoutProps {
    items: SidebarItem[]
    content: SideBarContent[]
}

export type SideBarContent = {
    href: string
    content: React.ReactNode
}

export type SidebarItem = {
    title: string
    href: string
    icon: JSX.Element
}

export default function SidebarLayout({ items, content }: SidebarLayoutProps) {
    return (
        <Tabs defaultValue={items[0].href} className="w-full">
            <TabsList className="bg-white border-none rounded-none gap-6 p-0">
                {items.map(item => (
                    <TabsTrigger
                        key={item.href}
                        className="px-0 shadow-none rounded-none flex-1 border-b-2 border-transparent pb-4 data-[state=active]:border-black data-[state=active]:shadow-none data-[state=active]:font-bold"
                        value={item.href}
                    >
                        {item.title}
                    </TabsTrigger>
                ))}
            </TabsList>
            <Separator className="bg-gray-200"></Separator>
            {content.map(item => (
                <TabsContent key={item.href} value={item.href}>
                    {item.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}
