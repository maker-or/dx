import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '~/components/ui/button';

type Event = {
  id: number;  // Add an ID to identify tasks
  date: number;
  text: string;
};

export default function CalendarTimeline() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [selectedDate, setSelectedDate] = useState(currentDate.getDate());
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editText, setEditText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const handleDateClick = (date: number) => {
    setSelectedDate(date);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/task');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json() as { taskId: number; task: string; date: string }[];
      
      const formattedEvents: Event[] = data.map((task) => ({
        id: task.taskId,
        date: parseInt(task.date, 10), // Convert string date to number
        text: task.task,
      }));
    
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleNewEvent = () => {
    const newEvent: Event = {
      date: selectedDate, text: '',
      id: 0
    };
    setEvents([...events, newEvent]);
    setEditingEvent(newEvent);
    setEditText('');
  };

  const handleEditStart = (event: Event) => {
    setEditingEvent(event);
    setEditText(event.text);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = useCallback(async () => {
    if (editingEvent) {
      const data = {
        task: editText,
        date: selectedDate.toString(), // Convert to string to match API expectation
      };
  
      const method = editingEvent.id ? "PATCH" : "POST";
      const url = editingEvent.id ? `/api/task/${editingEvent.id}` : "/api/task";
  
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        console.error('Failed to save task:', response.statusText);
      } else {
        await fetchTasks(); // Refetch tasks to update the state
      }
      setEditingEvent(null);
    }
  }, [editingEvent, editText, selectedDate]);

  useEffect(() => {
    fetchTasks().catch(error => console.error('Failed to fetch tasks:', error));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleSaveEdit();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        void handleSaveEdit();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleSaveEdit]);

  const filteredEvents = events.filter((event) => event.date === selectedDate);

  return (
    <div className="bg-neutral-900 text-[#f7eee3] p-6 rounded-lg w-full mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{monthNames[currentMonth]}</h1>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleNewEvent}
            variant="default"
            className="border-2 border-[#f7eee3] hover:bg-orange-600 hover:border-none "
          >
            New <Plus className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Date Picker */}
      <div className="flex space-x-4 mb-4 overflow-x-auto no-scrollbar pb-2 border-b border-neutral-800 h-auto">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((date) => (
          <button
            key={date}
            onClick={() => handleDateClick(date)}
            className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg font-bold ${
              selectedDate === date
                ? ' text-[#f7eee3] border-2 bg-[#0c0c0c] border-[#f7eee3]'
                : 'text-gray-400 hover:bg-neutral-800'
            }`}
          >
            {date}
          </button>
        ))}
      </div>

      {/* Events box for the selected date */}
      <div className="relative h-40 overflow-y-auto" id="box" >
        {filteredEvents.map((event, index) => (
          <div
            key={event.id || index}
            className="absolute h-8 bg-neutral-800 rounded-md flex items-center justify-center p-2  text-white"
            style={{
              left: '0',
              right: '0',
              top: `${index * 3}rem`,
            }}
            onDoubleClick={() => handleEditStart(event)}
          >
            {editingEvent === event ? (
              <input
                ref={inputRef}
                type="text"
                className="bg-neutral-800 text-white p-1 w-full  "
                value={editText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <span>{event.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
