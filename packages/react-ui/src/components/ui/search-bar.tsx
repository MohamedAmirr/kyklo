import { t } from 'i18next'
import { SearchIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

import { Badge } from './badge'
import { Button } from './button'
import { Input } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Separator } from './seperator'

interface SearchBarProps {
    title?: string
    filterValue: string
    handleFilterChange: (filterValue: string) => void
}

export const SearchBar = ({
    title,
    filterValue,
    handleFilterChange,
}: SearchBarProps) => {
    const [searchQuery, setSearchQuery] = useState(filterValue)
    const [debouncedQuery] = useDebounce(searchQuery, 300)

    useEffect(() => {
        handleFilterChange(debouncedQuery)
    }, [debouncedQuery])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border">
                    <SearchIcon className="mr-2 size-4" />
                    {title ? t(title) : ''}
                    {filterValue.length > 0 && (
                        <>
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal max-w-40 truncate"
                            >
                                {filterValue}
                            </Badge>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Input
                    type="text"
                    placeholder={t('What are you looking for?')}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </PopoverContent>
        </Popover>
    )
}
