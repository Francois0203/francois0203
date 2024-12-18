import React, { useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [status, setStatus] = useState({}); // Tracks the status of each day (e.g., available, red, yellow)
  const [selectedDay, setSelectedDay] = useState(null); // Stores the currently selected day
  const [selectedTimes, setSelectedTimes] = useState({}); // Stores selected times for each day

  // Days of the week header
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  // First day of the month and total days in the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Handle navigation to previous month
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setStatus({});
    setSelectedTimes({});
    setSelectedDay(null);
  };

  // Handle navigation to next month
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setStatus({});
    setSelectedTimes({});
    setSelectedDay(null);
  };

  // Toggle the selected date and hide the time slots when selecting a new day
  const toggleDate = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;

    // If a new day is clicked, reset the selected times for the new day and close the time slots for the old day
    if (selectedDay !== dateKey) {
      setSelectedDay(dateKey);
      setSelectedTimes({ [dateKey]: [] }); // Clear previously selected times
    } else {
      // If the same day is clicked again, just toggle the availability (yellow/available)
      setSelectedTimes({});
      setSelectedDay(null);
    }

    setStatus((prev) => {
      const currentStatus = prev[dateKey] || 'available';
      if (currentStatus === 'red') return prev; // Don't allow changes for red status
      return {
        ...prev,
        [dateKey]: currentStatus === 'yellow' ? 'available' : 'yellow', // Toggle between available and yellow
      };
    });
  };

  // Toggle the selected time slot for a particular day
  const toggleTime = (day, time) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    setSelectedTimes((prev) => {
      const timesForDate = prev[dateKey] || [];
      if (timesForDate.includes(time)) {
        return {
          ...prev,
          [dateKey]: timesForDate.filter((t) => t !== time), // Remove time if already selected
        };
      } else {
        return {
          ...prev,
          [dateKey]: [...timesForDate, time], // Add the selected time
        };
      }
    });
  };

  // Render the days of the calendar grid
  const renderDays = () => {
    const days = [];

    // Add empty blocks for the first row based on the starting day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={styles.empty}></div>);
    }

    // Render each day block
    for (let i = 1; i <= daysInMonth; i++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${i}`;
      const blockStatus = status[dateKey] || 'available';
      const timesForDate = selectedTimes[dateKey] || [];

      days.push(
        <div key={`day-${i}`} className={styles.dayContainer}>
          <div
            className={`${styles.day} ${styles[blockStatus]}`}
            onClick={() => toggleDate(i)}
          >
            {i}
          </div>
          {selectedDay === dateKey && blockStatus === 'yellow' && (
            <div className={styles.timeSlots}>
              {timeSlots.map((time) => (
                <div
                  key={`time-${i}-${time}`}
                  className={`${styles.timeSlot} ${timesForDate.includes(time) ? styles.selectedTime : ''}`}
                  onClick={() => toggleTime(i, time)}
                >
                  {time}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
  ];

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button className={styles.navButton} onClick={handlePrevMonth}>◀</button>
        <h2 className={styles.month}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button className={styles.navButton} onClick={handleNextMonth}>▶</button>
      </div>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayOfWeek}>{day}</div>
        ))}
      </div>
      <div className={styles.days}>
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;