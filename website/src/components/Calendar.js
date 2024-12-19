import React, { useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
  ];

  const isPastDay = (day) => {
    const today = new Date();
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return dateToCheck < today;
  };

  const toggleDaySelection = (day) => {
    if (isPastDay(day)) return;

    const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    const hasSelectedSlots = selectedTimeSlots[dayKey]?.length > 0;

    if (selectedDay === day && !hasSelectedSlots) {
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
    }
  };

  const toggleTimeSlotSelection = (time) => {
    if (!selectedDay) return;

    const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`;
    setSelectedTimeSlots((prev) => {
      const daySlots = prev[dayKey] || [];
      if (daySlots.includes(time)) {
        const updatedSlots = daySlots.filter((slot) => slot !== time);
        if (updatedSlots.length === 0 && selectedDay === parseInt(dayKey.split('-')[2], 10)) {
          setSelectedDay(null); // Unselect day if no slots remain selected
        }
        return { ...prev, [dayKey]: updatedSlots };
      } else {
        return { ...prev, [dayKey]: [...daySlots, time] };
      }
    });
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.empty}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = isPastDay(day);
      const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      const hasSelectedSlots = selectedTimeSlots[dayKey]?.length > 0;
      const isSelected = selectedDay === day || hasSelectedSlots;

      days.push(
        <div key={day} className={styles.dayContainer}>
          <div
            className={`${styles.day} ${isPast ? styles.unavailable : ''} ${isSelected ? styles.selectedDay : ''}`}
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

    const dayKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`;
    const selectedSlots = selectedTimeSlots[dayKey] || [];

    return (
      <div className={styles.timeSlots}>
        {timeSlots.map((time) => {
          const isUnavailable = isPastDay(selectedDay);
          const isSelected = selectedSlots.includes(time);

          return (
            <div
              key={time}
              className={`${styles.timeSlot} ${isUnavailable ? styles.unavailable : ''} ${
                isSelected ? styles.selected : ''
              }`}
              onClick={() => !isUnavailable && toggleTimeSlotSelection(time)}
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