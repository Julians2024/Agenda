// src/App.jsx
import React, { useState } from 'react';
import CalendarComponent from './components/Calendar';
import TimeSlots from './components/TimeSlots';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Opcional: Cargar los turnos del día seleccionado
  };

  const handleSlotChange = (hour, index, value) => {
    setSlots(prevSlots => ({
      ...prevSlots,
      [hour]: [
        ...(prevSlots[hour] || []).slice(0, index),
        value,
        ...(prevSlots[hour] || []).slice(index + 1),
      ],
    }));
  };

  return (
    <div>
      {!selectedDate ? (
        <CalendarComponent onDateChange={handleDateChange} />
      ) : (
        <TimeSlots
          selectedDate={selectedDate}
          slots={slots}
          onSlotChange={handleSlotChange}
        />
      )}
    </div>
  );
};

export default App;
