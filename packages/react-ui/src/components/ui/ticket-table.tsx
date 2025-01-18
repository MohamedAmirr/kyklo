"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {SearchBar} from "./search-bar"
import OpenClosedTickets from "@/components/open-closed-tickets";


export type Payment = {
    id: string
    title: string
    category: string
    ticketId: string
    username: string
    status: 'Opened' | 'Closed'
    actions: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "ticketId",
        header: ({column}) => (
            <div className="flex items-center">
                Ticket ID
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            </div>
        ),
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("ticketId")}</div>
        ),
    },
    {
        accessorKey: "title",
        header: ({column}) => (
            <div className="flex items-center">
                Title
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            </div>
        ),
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "category",
        header: ({column}) => (
            <div className="flex items-center">
                Category
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            </div>
        ),
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("category")}</div>
        ),
    },
    {
        accessorKey: "username",
        header: ({column}) => (
            <div className="flex items-center">
                Username
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            </div>
        ),
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("username")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: ({column}) => (
            <div className="flex items-center">
                Status
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            </div>
        ),
        cell: ({row}) => {
            const status: string = row.getValue("status");
            const bgColor = status === 'Opened' ? 'bg-success-100 text-success-300' : 'bg-destructive-100 text-destructive-300';

            return (
                <div className={`capitalize ${bgColor}  p-1 px-2 inline-block text-center rounded-3xl`}>
                    {status}
                </div>
            );
        },
        filterFn: (row, columnId, value) => {
            const rowStatus = (row.getValue(columnId) as string).toLowerCase();
            return rowStatus === value.toLowerCase();
        },
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <DropdownMenuItem className="cursor-pointer p-0 px-0">
                            <Button size={"sm"} className={"w-full"}>Close Ticket</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function TicketTable({data}: { data: Payment[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        [{ id: "status", value: "opened" }]
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const updateFilter = (id: string, value: string | undefined) => {
        setColumnFilters((prevFilters) => {
            const existingFilterIndex = prevFilters.findIndex(
                (filter) => filter.id === id
            );

            if (existingFilterIndex > -1) {
                if (value) {
                    return prevFilters.map((filter, index) =>
                        index === existingFilterIndex
                            ? { id, value }
                            : filter
                    );
                }
                return prevFilters.filter((filter) => filter.id !== id);
            }

            return [...prevFilters, { id, value }];
        });
    };

    const setStatusFilter = (status: "opened" | "closed") => {
        updateFilter("status", status);
    };

    const setTitleFilter = (title: string) => {
        updateFilter("title", title);
    };

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <div className="flex items-center justify-between p-4">
                    <div className={"flex items-center gap-12"}>
                        <SearchBar
                            filterValue={columnFilters.find((filter) => filter.id === "title")?.value as string || ""}
                            handleFilterChange={setTitleFilter}
                        />
                        <OpenClosedTickets
                            numberOfClosedTickets={data.filter(ticket => ticket.status === 'Closed').length}
                            numberOfOpenedTickets={data.filter(ticket => ticket.status === 'Opened').length}
                            selectedStatus={(columnFilters.find(
                                (f) => f.id === "status"
                            )?.value as "opened" | "closed") || "opened"}
                            onFilterChange={setStatusFilter}
                        />
                    </div>
                    <Button size={"sm"}>New Ticket</Button>
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className={"bg-gray-100"}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between space-x-2 p-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Columns <ChevronDown/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
