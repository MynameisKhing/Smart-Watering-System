import React, { useState } from "react";
import "./schedule.css";

export default function Schedule() {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [scheduleList, setScheduleList] = useState<string[]>([]);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const handleAdd = () => {
    const time = `${hour}:${minute}`;
    if (!scheduleList.includes(time)) {
      setScheduleList([...scheduleList, time]);
    }
  };

  const handleDelete = (idx: number) => {
    setScheduleList(scheduleList.filter((_, i) => i !== idx));
    if (editingIdx === idx) setEditingIdx(null);
  };

  const handleEdit = (idx: number) => {
    const [h, m] = scheduleList[idx].split(":");
    setHour(h);
    setMinute(m);
    setEditingIdx(idx);
  };

  const handleSaveEdit = () => {
    if (editingIdx !== null) {
      const updated = [...scheduleList];
      updated[editingIdx] = `${hour}:${minute}`;
      setScheduleList(updated);
      setEditingIdx(null);
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

          {editingIdx === null ? (
            <button onClick={handleAdd}>+ Add</button>
          ) : (
            <button onClick={handleSaveEdit}>Save</button>
          )}
        </div>

        <div className="schedule-list">
          <h3>Current Schedule</h3>
          {scheduleList.length === 0 ? (
            <div className="schedule-empty">No watering times scheduled yet.</div>
          ) : (
            <div className="schedule-badges">
              {scheduleList.map((time, idx) => (
                <div key={idx} className="schedule-badge">
                  <span>{time}</span>
                  <div className="schedule-actions">
                    <button onClick={() => handleEdit(idx)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(idx)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="device-status">
          <h3>Device Status</h3>
          <div className="status-ok">
            Your watering device is connected and working properly
          </div>
        </div>
      </section>
    </main>
  );
}
