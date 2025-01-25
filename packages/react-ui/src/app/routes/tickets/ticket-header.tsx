import { Plus, Ticket } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const TicketHeader = () => {
    return (
        <div>
            <div className="flex h-[50px] items-center mb-5">
                <div className="flex items-center gap-2">
                    <div className="w-[26px] h-[26px] p-1 flex items-center justify-center bg-primary text-white rounded-xs">
                        <Ticket size={26} />
                    </div>
                    <span className="text-2xl font-semibold">Ticket</span>
                </div>
                <div className="grow"></div>
            </div>
        </div>
    )
}
