import { MailWarning } from 'lucide-react'

export const ComplaintHeader = () => {
    return (
        <div>
            <div className="flex h-[50px] items-center mb-5">
                <div className="flex items-center gap-2">
                    <div className="w-[26px] h-[26px] p-1 flex items-center justify-center bg-primary text-white rounded-xs">
                        <MailWarning size={26} />
                    </div>
                    <span className="text-2xl font-semibold">Complaints</span>
                </div>
                <div className="grow"></div>
            </div>
        </div>
    )
}
