// CalendarComponent.jsx
import  { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (newDate) => {
        setDate(newDate);
    };

    return (
       <div className='flex justify-center items-center'>
         <div className="calendar-container">
            <Calendar
                onChange={onChange}
                value={date}
            />
            <p className="text-center mt-3">Selected date: {date.toDateString()}</p>
        </div>
       </div>
    );
};

export default CalendarComponent;
