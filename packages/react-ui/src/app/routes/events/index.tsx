import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {useNavigate} from "react-router-dom";

const events = [
    {
        id: 1,
        category: 'Web',
        title: 'Basics of Angular',
        description: 'Introductory course for',
        duration: '17h 34m',
        rating: 4.4,
        reviews: 8,
        image: 'src/assets/picnic.jpg',
    },
    {
        id: 2,
        category: 'Design',
        title: 'UI/UX Design',
        description: 'Learn how to design a',
        duration: '19h 17m',
        rating: 4.9,
        reviews: 10,
        image: 'src/assets/picnic.jpg',
    },
    {
        id: 3,
        category: 'Web',
        title: 'React Native',
        description: 'Master React.js. Build',
        duration: '16h 16m',
        rating: 4.8,
        reviews: 9,
        image: 'src/assets/picnic.jpg',
    },
    {
        id: 4,
        category: 'Design',
        title: 'Art & Drawing',
        description: 'Easy-to-follow videos & guides show you how to draw animals & people.',
        duration: '15h 49m',
        rating: 4.7,
        reviews: 18,
        image: 'src/assets/picnic.jpg',
    },
    {
        id: 5,
        category: 'Web',
        title: 'React for Beginners',
        description: 'Learn React in just a couple of afternoons with this immersive course',
        duration: '1h 42m',
        rating: 4.5,
        reviews: 68,
        image: 'src/assets/picnic.jpg',
    },
    // Add more events here
    {
        id: 6,
        category: 'Web',
        title: 'Advanced React',
        description: 'Deep dive into advanced React concepts and patterns.',
        duration: '20h 00m',
        rating: 4.6,
        reviews: 15,
        image: 'src/assets/picnic.jpg',
    },
    {
        id: 7,
        category: 'Design',
        title: 'Advanced Figma',
        description: 'Master Figma with advanced design techniques.',
        duration: '18h 30m',
        rating: 4.8,
        reviews: 12,
        image: 'src/assets/picnic.jpg',
    },
    {
        id: 8,
        category: 'Web',
        title: 'Node.js Fundamentals',
        description: 'Learn the basics of Node.js and backend development.',
        duration: '14h 20m',
        rating: 4.7,
        reviews: 20,
        image: 'src/assets/picnic.jpg',
    },
    {
        id: 9,
        category: 'Design',
        title: 'Illustration Techniques',
        description: 'Learn advanced illustration techniques for digital art.',
        duration: '16h 45m',
        rating: 4.9,
        reviews: 25,
        image: 'src/assets/picnic.jpg',
    },
    {
        id: 10,
        category: 'Web',
        title: 'Vue.js for Beginners',
        description: 'Get started with Vue.js and build your first app.',
        duration: '12h 10m',
        rating: 4.5,
        reviews: 30,
        image: 'src/assets/picnic.jpg',
    },
    {
        id: 11,
        category: 'Design',
        title: 'Typography Mastery',
        description: 'Master the art of typography in design.',
        duration: '13h 55m',
        rating: 4.8,
        reviews: 22,
        image: 'src/assets/picnic.jpg',
    }
];

const EventsPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;
    const navigate = useNavigate(); // For web
    // const navigation = useNavigation(); // For mobile

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const totalPages = Math.ceil(events.length / eventsPerPage);

    // use mutation *****
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleShowDetails = (eventId: number) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <div className="flex flex-col items-center p-4 min-h-screen">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentEvents.map((event) => (
                    <Card key={event.id} className="w-full h-full flex flex-col">
                        <CardHeader className="p-0">
                            <img
                                src={event.image}
                                alt="Event Image"
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </CardHeader>
                        <CardContent className="flex-grow p-4 text-left">
                            <CardTitle className="text-xl font-medium mt-2">{event.title}</CardTitle>
                            <CardDescription className="text-sm text-gray-600 mt-2">
                                {event.description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Button
                                className="w-full"
                                onClick={() => handleShowDetails(event.id)}
                            >
                                Show details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
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
                        variant={currentPage === index + 1 ? "default" : "outline"}
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
    );
};

export default EventsPage;