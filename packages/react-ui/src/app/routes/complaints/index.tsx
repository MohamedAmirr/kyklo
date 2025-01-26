import {
    CategoryType,
    Complaint,
    ComplaintEnriched,
    ComplaintStatus,
} from '@pickup/shared'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { t } from 'i18next'
import { CheckIcon, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import {
    BulkAction,
    CURSOR_QUERY_PARAM,
    DataTable,
    LIMIT_QUERY_PARAM,
    RowDataWithActions,
} from '@/components/ui/data-table'
import { DataTableColumnHeader } from '@/components/ui/data-table/data-table-column-header'
import TicketDetails from '@/components/ui/ticket-details'
import { categoryApi } from '@/lib/category-api'
import { complaintApi } from '@/lib/complaint-api'
import { formatUtils } from '@/lib/utils'

import { CreateComplaintDialog } from './create-complaint-dialog'

export function ComplaintPage() {
    const [openSelectedTicket, setOpenSelectedTicket] = useState(false)
    const [selectedRow, setSelectedRow] = useState<ComplaintEnriched | null>(
        null
    )

    const [searchParams] = useSearchParams()

    const { data, isLoading } = useQuery({
        queryKey: ['complaints', searchParams.toString()],
        staleTime: 0,
        queryFn: () => {
            const cursor = searchParams.get(CURSOR_QUERY_PARAM) ?? undefined
            const status = searchParams.getAll('status') as ComplaintStatus[]
            const title = searchParams.get('title') ?? undefined
            const limit = searchParams.get(LIMIT_QUERY_PARAM)
                ? parseInt(searchParams.get(LIMIT_QUERY_PARAM)!)
                : 10
            return complaintApi.list({
                cursor,
                limit,
                status,
                title,
            })
        },
    })

    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['complaint-categories'],
        queryFn: () => categoryApi.list({ type: CategoryType.COMPLAINT }),
        staleTime: 0,
    })

    const columns: ColumnDef<RowDataWithActions<ComplaintEnriched>>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title={t('Complaint Id')}
                />
            ),
            cell: ({ row }) => (
                <div className="text-left font-medium min-w-[150px]">
                    #{row.original.number}
                </div>
            ),
        },
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Title')} />
            ),
            cell: ({ row }) => (
                <div className="text-left font-medium min-w-[150px]">
                    {row.getValue('title')}
                </div>
            ),
        },
        {
            accessorKey: 'username',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Username')} />
            ),
            cell: ({ row }) => (
                <div className="flex text-left font-medium min-w-[150px] gap-2">
                    <User className="w-4 h-4" />
                    {row.original.user.firstName} {row.original.user.lastName}
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Status')} />
            ),
            cell: ({ row }) => {
                const status: string = (
                    row.getValue('status') as string
                ).toLowerCase()
                const bgColor =
                    status === 'open'
                        ? 'bg-success-100 text-success-300'
                        : 'bg-destructive-100 text-destructive-300'

                return (
                    <div
                        className={`capitalize ${bgColor}  p-1 px-2 inline-block text-center rounded-3xl`}
                    >
                        {t(status)}
                    </div>
                )
            },
        },
        {
            accessorKey: 'category',
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={t('Category')} />
            ),
            cell: ({ row }) => (
                <div className="text-left font-medium min-w-[150px]">
                    {row.original.category.name}
                </div>
            ),
        },
    ]

    const bulkActions: BulkAction<Complaint>[] = useMemo(
        () => [
            {
                render: () => {
                    return (
                        <CreateComplaintDialog
                            categories={categories?.data || []}
                        />
                    )
                },
            },
        ],
        [categories]
    )

    const handleRowOnClick = (row: ComplaintEnriched) => {
        setSelectedRow(row)
        setOpenSelectedTicket(true)
    }

    const filters = [
        {
            type: 'input',
            title: t('Title'),
            accessorKey: 'title',
            options: [],
            icon: CheckIcon,
        } as const,
        {
            type: 'select',
            title: t('Status'),
            accessorKey: 'status',
            options: Object.values(ComplaintStatus).map(status => {
                return {
                    label: formatUtils.convertEnumToHumanReadable(status),
                    value: status,
                }
            }),
            icon: CheckIcon,
        } as const,
    ]

    return (
        <div>
            <DataTable
                columns={columns}
                page={data?.data}
                filters={filters}
                bulkActions={bulkActions}
                isLoading={isLoading || isLoadingCategories}
                onRowClick={handleRowOnClick}
            />
            {selectedRow && (
                <TicketDetails
                    open={openSelectedTicket}
                    handleClose={() => setOpenSelectedTicket(false)}
                    userDetails={selectedRow.user}
                    ticketNumber={selectedRow.number}
                    category={selectedRow.category.name}
                    status={selectedRow.status}
                />
            )}
        </div>
    )
}
