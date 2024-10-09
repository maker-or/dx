import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

// Define the Event type
type Event = {
  date: number
  duration: number
  text: string
}

export default function CalendarTimeline() {
  const [selectedDate, setSelectedDate] = useState(2)
  const [events, setEvents] = useState<Event[]>([
    { date: 2, duration: 4, text: 'Meeting with Team' },
    { date: 2, duration: 3, text: 'Workout' },
    { date: 3, duration: 5, text: 'Project Discussion' },
  ])
  
  // Set the type for newEvent to be of type Event or null
  const [newEvent, setNewEvent] = useState<Event | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleDateClick = (date: number) => {
    setSelectedDate(date)
  }

  const handleNewEvent = () => {
    // Create a new event box for the selected date with empty text and set it to editable
    const event: Event = { date: selectedDate, duration: 2, text: '' }
    setEvents([...events, event])
    setIsEditing(true)
    setNewEvent(event)
  }

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>, event: Event) => {
    const updatedEvents = events.map(ev => (ev === event ? { ...ev, text: e.target.value } : ev))
    setEvents(updatedEvents)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, _event: Event) => {
    if (e.key === 'Enter') {
      setIsEditing(false)
      setNewEvent(null)
    }
  }

  // Filter events to show only those that match the selected date
  const filteredEvents = events.filter(event => event.date === selectedDate)

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-lg w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">September 2024</h1>
        <div className="flex items-center space-x-2">
          <Select defaultValue="day">
            <SelectTrigger className="w-[100px]  text-gray-400 border-neutral-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleNewEvent} variant="default" className="bg-orange-500 hover:bg-orange-600">
            New <Plus className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Date Picker */}
      <div className="flex space-x-4 mb-4 overflow-x-auto pb-2 border-b border-neutral-800">
        {Array.from({ length: 14 }, (_, i) => i + 1).map((date) => (
          <button
            key={date}
            onClick={() => handleDateClick(date)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold ${
              selectedDate === date ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-neutral-800'
            }`}
          >
            {date}
          </button>
        ))}
      </div>

      {/* Events box for the selected date */}
      <div className="relative h-40" id="box">
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            className="absolute h-8 bg-neutral-800 rounded-md flex items-center justify-center p-2 text-white"
            style={{
              left: `${(event.date - 1) * 3.5}rem`, // Adjust based on your layout
              width: `${event.duration * 3.5}rem`,
              top: `${index * 3}rem`,
            }}
          >
            {isEditing && event === newEvent ? (
              <input
                type="text"
                className="bg-neutral-800 text-white p-1 w-full"
                value={event.text}
                onChange={(e) => handleEventChange(e, event)}
                onKeyPress={(e) => handleKeyPress(e, event)}
                autoFocus
              />
            ) : (
              <span>{event.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
