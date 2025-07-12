import React, { useState } from "react";
import "./schedule.css";

export default function Schedule() {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [scheduleList, setScheduleList] = useState<string[]>([]);

  const handleAdd = () => {
    const time = `${hour}:${minute}`;
    if (!scheduleList.includes(time)) {
      setScheduleList([...scheduleList, time]);
    }
  };

  return (
    <main className="container">
      <section>
        <h2 className="section-title">Schedule</h2>
        <div className="schedule-form">
          <select value={hour} onChange={(e) => setHour(e.target.value)}>
            {[...Array(24)].map((_, i) => {
              const val = i.toString().padStart(2, "0");
              return <option key={val} value={val}>{val}</option>;
            })}
          </select>

          <select value={minute} onChange={(e) => setMinute(e.target.value)}>
            {[...Array(60)].map((_, i) => {
              const val = i.toString().padStart(2, "0");
              return <option key={val} value={val}>{val}</option>;
            })}
          </select>

          <button onClick={handleAdd}>+ Add</button>
        </div>

        <div className="schedule-list">
          <h3>Current Schedule</h3>
          {scheduleList.length === 0 ? (
            <div className="schedule-empty">No watering times scheduled yet.</div>
          ) : (
            <ul>
              {scheduleList.map((time, idx) => (
                <li key={idx}>{time}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="device-status">
          <h3>Device Status</h3>
          <div className="status-ok">
            ✅ Your watering device is connected and working properly
          </div>
        </div>
      </section>
    </main>
  );
}
