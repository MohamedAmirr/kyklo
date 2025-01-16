import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // For web

// Type Imports
import type { Event } from '../../../../../shared/src/lib/event';
import {useQuery} from "@tanstack/react-query";

const EventDetails = () => {
    // Get the event ID from the URL
    const { id } = useParams<{ id: string }>();

    // State to store the fetched event data
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useQuery(() => {
        const fetchEventData = async () => {
            try {
                const response = await fetch(`/api/events/${id}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const data = await response.json();
                setEvent(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchEventData();
    }, [id]);

    if (loading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600">Error: {error}</div>;
    }

    if (!event) {
        return <div className="p-6 text-center">Event not found</div>;
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">{event.title}</h1>
                    <p className="text-gray-600">
                        Prof. <span className="font-medium text-gray-900">{event.instructor}</span>
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">{event.category}</span>
                    <i className="fas fa-share cursor-pointer text-gray-600" />
                    <i className="fas fa-bookmark cursor-pointer text-gray-600" />
                </div>
            </div>
            <div className="p-6">
                <div className="border rounded-lg">
                    <div className="m-2 overflow-hidden rounded-lg">
                        <img
                            src={event.image}
                            alt='Course Thumbnail'
                            className="w-full h-64 object-cover bg-gray-200"
                        />
                    </div>
                    <div className="flex flex-col gap-6 p-5">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">About this course</h2>
                            <p className="text-gray-700">{event.about}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">By the numbers</h2>
                            <div className="flex flex-wrap gap-x-12 gap-y-2">
                                <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-check text-gray-600" />
                                        <span>Skill level: {event.skillLevel}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-users text-gray-600" />
                                        <span>Students: {event.totalStudents.toLocaleString()}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-globe text-gray-600" />
                                        <span>Languages: {event.language}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-file text-gray-600" />
                                        <span>Captions: {event.isCaptions ? 'Yes' : 'No'}</span>
                                    </li>
                                </ul>
                                <ul className="flex flex-col gap-2">
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-video text-gray-600" />
                                        <span>Lectures: {event.totalLectures}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i className="fas fa-clock text-gray-600" />
                                        <span>Video: {event.length}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Description</h2>
                            {event.description.map((value, index) => (
                                <p key={index} className="text-gray-700">{value}</p>
                            ))}
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Instructor</h2>
                            <div className="flex items-center gap-4">
                                <img
                                    src={event.instructorAvatar}
                                    alt="Instructor"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex flex-col gap-1">
                                    <p className="font-medium text-gray-900">{event.instructor}</p>
                                    <p className="text-sm text-gray-600">{event.instructorPosition}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;