import React from 'react';
import { useParams } from 'react-router-dom'; // For web
import { useQuery } from '@tanstack/react-query';

// Type Imports
import type { Event } from '../../../../../shared/src/lib/event';

const fetchEventData = async (id: string): Promise<Event> => {
    const response = await fetch(`http://localhost:3000/api/v1/events/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch event data');
    }
    return response.json();
};

const EventDetails = () => {
    // Get the event ID from the URL
    const { id } = useParams<{ id: string }>();

    // Use useQuery to fetch the event data
    const {
        data: event,
        isLoading,
        isError,
        error,
    } = useQuery<Event, Error>({
        queryKey: ['event', id], // Unique query key
        queryFn: () => fetchEventData(id!), // Query function
        enabled: !!id, // Only run the query if the id is available
    });

    // Loading state
    if (isLoading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    // Error state
    if (isError) {
        return <div className="p-6 text-center text-red-600">Error: {error?.message}</div>;
    }

    // Event not found state
    if (!event) {
        return <div className="p-6 text-center">Event not found</div>;
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">{event.title}</h1>
                    <p className="text-gray-600">
                        Prof. <span className="font-medium text-gray-900">{event.price}</span>
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">{event.price}</span>
                    <i className="fas fa-share cursor-pointer text-gray-600" />
                    <i className="fas fa-bookmark cursor-pointer text-gray-600" />
                </div>
            </div>
            <div className="p-6">
                <div className="border rounded-lg">
                    <div className="m-2 overflow-hidden rounded-lg">

                    </div>
                    <div className="flex flex-col gap-6 p-5">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">About this course</h2>
                            <p className="text-gray-700">{event.price}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">By the numbers</h2>
                            <div className="flex flex-wrap gap-x-12 gap-y-2">
                                <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-gray-600" />
                                        <span>Skill level: {event.price}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-users text-gray-600" />
                                        <span>Students: {event.price}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-globe text-gray-600" />
                                        <span>Languages: {event.price}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-file text-gray-600" />
                                        <span>Captions: {event.price ? 'Yes' : 'No'}</span>
                                    </li>
                                </ul>
                                <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-video text-gray-600" />
                                        <span>Lectures: {event.price}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-clock text-gray-600" />
                                        <span>Video: {event.price}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Description</h2>
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Instructor</h2>
                            <div className="flex items-center gap-4">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;