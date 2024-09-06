import React, { useState } from 'react';
import './TimeSlots.css'; // Importa el archivo CSS

const hours = Array.from({ length: 13 }, (_, i) => i + 8); // Horas de 8:00 a 20:00

const TimeSlots = () => {
  const [slots, setSlots] = useState(
    hours.map((hour) => ({
      hour,
      slots: Array.from({ length: 6 }, (_, i) => ({
        id: `${hour}-${i + 1}`,
        name: '',
        observation: ''
      }))
    }))
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [turnName, setTurnName] = useState('');
  const [observation, setObservation] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const handleTimeSlotClick = (hour, slotId) => {
    const slot = slots
      .find(s => s.hour === hour)
      .slots.find(slot => slot.id === slotId);

    setSelectedSlot({ hour, slotId });
    setTurnName(slot.name); // Cargar nombre del turno en el input
    setObservation(slot.observation); // Cargar observación en el input
    setShowDialog(true);
  };

  const handleSave = () => {
    const updatedSlots = slots.map((hourSlot) => {
      if (hourSlot.hour === selectedSlot.hour) {
        return {
          ...hourSlot,
          slots: hourSlot.slots.map((slot) =>
            slot.id === selectedSlot.slotId
              ? { ...slot, name: turnName, observation: observation }
              : slot
          )
        };
      }
      return hourSlot;
    });
    setSlots(updatedSlots);
    setShowDialog(false);
  };

  const handleDelete = () => {
    const updatedSlots = slots.map((hourSlot) => {
      if (hourSlot.hour === selectedSlot.hour) {
        return {
          ...hourSlot,
          slots: hourSlot.slots.map((slot) =>
            slot.id === selectedSlot.slotId
              ? { ...slot, name: '', observation: '' }
              : slot
          )
        };
      }
      return hourSlot;
    });
    setSlots(updatedSlots);
    setShowDialog(false);
  };

  return (
    <div className="time-slot-container">
      {slots.map((hourSlot) => (
        <div key={hourSlot.hour} className="hour-group">
          <h3 className="hour-title">{hourSlot.hour}:00</h3>
          {hourSlot.slots.map((slot) => (
            <div key={slot.id} className="time-slot-group">
              <div 
                className="time-slot" 
                onClick={() => handleTimeSlotClick(hourSlot.hour, slot.id)}
              >
                {slot.name || `Turno ${slot.id.split('-')[1]}`}
              </div>
              <div className="input-observation">
                {slot.observation || "Observaciones"}
              </div>
            </div>
          ))}
        </div>
      ))}

      {showDialog && (
        <div className="dialog">
          <input
            type="text"
            placeholder="Nombre del turno"
            value={turnName}
            onChange={(e) => setTurnName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Observaciones"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
          <div className="icon-container">
            <span onClick={handleSave}>💾</span> {/* Icono de guardar */}
            <span onClick={handleDelete}>🗑️</span> {/* Icono de borrar */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
