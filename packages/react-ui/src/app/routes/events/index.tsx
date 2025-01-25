import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

interface Event {
    id: number
    title: string
    description: string
    imageUrls: string[]
}

const EventsPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [events, setEvents] = useState<Event[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const eventsPerPage = 8
    const navigate = useNavigate()

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/v1/events/list/${currentPage}`
                )
                const data = await response.json()
                if (data.success) {
                    setEvents(data.data.data)
                    setTotalPages(Math.ceil(data.data.total / eventsPerPage))
                } else {
                    console.error('Failed to fetch events:', data)
                }
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        }

        fetchEvents()
    }, [currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleShowDetails = (eventId: number) => {
        navigate(`/events/${eventId}`)
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col items-center min-h-screen w-full">
                <div className="w-full max-w-screen-2xl mx-auto">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {events.map(event => (
                            <Card
                                key={event.id}
                                className="w-full h-full flex flex-col"
                            >
                                <CardHeader className="p-1">
                                    <img
                                        src={event.imageUrls[0]}
                                        alt="Event Image"
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardContent className="flex-grow p-4 text-left">
                                    <CardTitle className="text-xl font-medium mt-2">
                                        {event.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-gray-600 mt-2">
                                        {event.description}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="p-4">
                                    <Button
                                        className="w-full"
                                        onClick={() =>
                                            handleShowDetails(event.id)
                                        }
                                    >
                                        Show details
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex gap-2 mt-8 items-center">
                    <Button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        variant="outline"
                    >
                        Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            variant={
                                currentPage === index + 1
                                    ? 'default'
                                    : 'outline'
                            }
                        >
                            {index + 1}
                        </Button>
                    ))}
                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        variant="outline"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EventsPage
