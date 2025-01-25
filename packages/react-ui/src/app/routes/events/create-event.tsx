import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { format } from 'date-fns'
import { Input } from '@/components/ui/input'

export default function AddEventPage() {
    const navigate = useNavigate()
    const [eventDetails, setEventDetails] = useState({
        title: '',
        date: '',
        description: '',
        paymentMethod: 'Cash', // Default payment method
        cost: '',
        image: null, // For storing the uploaded image
    })

    const handleSave = () => {
        // Save event details (e.g., send to an API)
        console.log('Event Details:', eventDetails)
        navigate('/events') // Navigate back to the events page
    }
    const [date, setDate] = React.useState<Date>()

    //   const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //       setEventDetails({ ...eventDetails, image: file });
    //     }
    //   };

    return (
        <div className="flex w-full items-center justify-center min-h-screen">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
                <div className="space-y-4">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Event Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            //   onChange={handleImageUpload}
                            className="w-full p-2 border rounded"
                        />
                        {eventDetails.image && (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(
                                        eventDetails.image
                                    )}
                                    alt="Event Preview"
                                    className="w-32 h-32 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" placeholder="Title" />
                    </div>

                    {/* Date */}
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="date">Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full justify-start text-left font-normal',
                                        !date && 'text-muted-foreground'
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, 'PPP')
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-full p-0"
                                align="center"
                            >
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Description */}
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            placeholder="Type event description here."
                            id="description"
                        />
                    </div>

                    {/* Payment Method Dropdown */}
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a payment method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Payments</SelectLabel>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="card">Card</SelectItem>
                                <SelectItem value="wallet">Wallet</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Cost */}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="cost">Cost</Label>
                        <Input type="number" id="cost" placeholder="Cost" />
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save Event
                    </button>
                </div>
            </div>
        </div>
    )
}
