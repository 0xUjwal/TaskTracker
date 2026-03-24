import { useState, useRef, useEffect } from "react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function DatePicker({ value, onChange }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    return value ? new Date(value + "T00:00:00") : new Date();
  });
  const containerRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update viewDate when value changes externally
  useEffect(() => {
    if (value) {
      setViewDate(new Date(value + "T00:00:00"));
    }
  }, [value]);

  // Get days to display in the calendar grid
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Build calendar grid
  const calendarDays = [];
  // Empty slots before first day
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  // Days of the month
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day) => {
    // Format as YYYY-MM-DD
    const selected = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(selected);
    setShowCalendar(false);
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  // Check if a day is the currently selected date
  const isSelected = (day) => {
    if (!value) return false;
    const selected = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return value === selected;
  };

  // Check if a day is today
  const isToday = (day) => {
    const now = new Date();
    return day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
  };

  return (
    <div className="datepicker" ref={containerRef}>
      <div className="datepicker-input-row">
        <input
          type="date"
          value={value}
          onChange={handleInputChange}
          className="datepicker-input"
        />
        <button
          type="button"
          className="datepicker-toggle"
          onClick={toggleCalendar}
          title="Open calendar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </div>

      {showCalendar && (
        <div className="datepicker-dropdown">
          <div className="datepicker-header">
            <button type="button" onClick={handlePrevMonth} className="datepicker-nav">
              &lt;
            </button>
            <span className="datepicker-month-year">
              {MONTHS[month]} {year}
            </span>
            <button type="button" onClick={handleNextMonth} className="datepicker-nav">
              &gt;
            </button>
          </div>

          <div className="datepicker-days-header">
            {DAYS.map((d) => (
              <span key={d} className="datepicker-day-name">{d}</span>
            ))}
          </div>

          <div className="datepicker-days-grid">
            {calendarDays.map((day, i) => (
              <button
                key={i}
                type="button"
                className={
                  "datepicker-day" +
                  (day === null ? " empty" : "") +
                  (isSelected(day) ? " selected" : "") +
                  (isToday(day) ? " today" : "")
                }
                onClick={() => day && handleDayClick(day)}
                disabled={day === null}
              >
                {day || ""}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="datepicker-today-btn"
            onClick={() => {
              const now = new Date();
              const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
              onChange(todayStr);
              setViewDate(now);
              setShowCalendar(false);
            }}
          >
            Today
          </button>
        </div>
      )}
    </div>
  );
}
