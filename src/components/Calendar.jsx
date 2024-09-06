// src/components/Calendar.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa el estilo predeterminado

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
    </div>
  );
};

export default CalendarComponent;
