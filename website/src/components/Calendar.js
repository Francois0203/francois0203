import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './Calendar.module.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [timeSlotsAvailability, setTimeSlotsAvailability] = useState({});
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Memoizing timeSlots array
  const timeSlots = useMemo(() => [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
  ], []);

  // Memoizing parseTimeSlot function
  const parseTimeSlot = useCallback((day, timeSlot) => {
    const [time, period] = timeSlot.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const hours24 = period === 'PM' && hours !== 12 ? hours + 12 : hours % 12;
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), day, hours24, minutes);
  }, [currentDate]);

  // Memoizing isPastDay function
  const isPastDay = useCallback((day) => {
    const today = new Date();
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return dateToCheck.setHours(23, 59, 59, 999) < today;
  }, [currentDate]);

  useEffect(() => {
    const today = new Date();
    const newAvailability = {};

    for (let day = 1; day <= daysInMonth; day++) {
      if (isPastDay(day)) {
        newAvailability[day] = timeSlots.map(() => false);
        continue;
      }

      const availabilityForDay = timeSlots.map((slot) => {
        const slotTime = parseTimeSlot(day, slot);
        return slotTime > today;
      });

      newAvailability[day] = availabilityForDay;
    }

    setTimeSlotsAvailability(newAvailability);
  }, [currentDate, daysInMonth, isPastDay, parseTimeSlot, timeSlots]);

  const toggleDaySelection = (day) => {
    if (isPastDay(day) || !timeSlotsAvailability[day]?.includes(true)) return;
    setSelectedDay(selectedDay === day ? null : day);
  };

  const toggleTimeSlotSelection = (timeIndex) => {
    if (!selectedDay || !timeSlotsAvailability[selectedDay][timeIndex]) return;

    const dayKey = selectedDay;
    setSelectedTimeSlots((prev) => {
      const currentSlots = prev[dayKey] || [];
      const isSelected = currentSlots.includes(timeIndex);
      const updatedSlots = isSelected
        ? currentSlots.filter((slot) => slot !== timeIndex)
        : [...currentSlots, timeIndex];

      if (updatedSlots.length === 0) {
        setSelectedDay(null); // Deselect day if no slots are selected
      }

      return { ...prev, [dayKey]: updatedSlots };
    });
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.empty}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = isPastDay(day);
      const hasAvailableSlots = timeSlotsAvailability[day]?.includes(true);
      const hasSelectedSlots = selectedTimeSlots[day]?.length > 0;
      const isSelected = selectedDay === day || hasSelectedSlots;

      days.push(
        <div key={day} className={styles.dayContainer}>
          <div
            className={`${styles.day} ${isPast || !hasAvailableSlots ? styles.unavailable : ''} ${
              isSelected ? styles.selectedDay : ''
            }`}
            onClick={() => toggleDaySelection(day)}
          >
            {day}
          </div>
        </div>
      );
    }

    return days;
  };

  const renderTimeSlots = () => {
    if (!selectedDay) return null;

    const selectedSlots = selectedTimeSlots[selectedDay] || [];
    return (
      <div className={styles.timeSlots}>
        {timeSlots.map((time, index) => {
          const isUnavailable = !timeSlotsAvailability[selectedDay]?.[index];
          const isSelected = selectedSlots.includes(index);
          return (
            <div
              key={time}
              className={`${styles.timeSlot} ${isUnavailable ? styles.unavailable : ''} ${
                isSelected ? styles.selected : ''
              }`}
              onClick={() => !isUnavailable && toggleTimeSlotSelection(index)}
            >
              {time}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.description}>
        <p>
          Make a booking using the calendar below. If you want to make an online booking, you must book at least 2 days prior to the booking date. If you want to make a contact booking, you must at least book 7 days prior to the booking date.
        </p>
      </div>

      <div className={styles.header}>
        <button
          className={styles.navButton}
          onClick={() =>
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
          }
        >
          ◀
        </button>
        <h2 className={styles.month}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          className={styles.navButton}
          onClick={() =>
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
          }
        >
          ▶
        </button>
      </div>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayOfWeek}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>{renderDays()}</div>
      {renderTimeSlots()}
    </div>
  );
};

export default Calendar;