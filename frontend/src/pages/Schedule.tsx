// src/pages/Schedule.tsx
import { useState, useEffect } from "react";

export default function Schedule() {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [schedule, setSchedule] = useState<string[]>([]);

  // โหลดตารางเวลาเมื่อเริ่มต้น
  useEffect(() => {
    const saved = localStorage.getItem("schedule");
    if (saved) setSchedule(JSON.parse(saved));
  }, []);

  // บันทึกตารางเวลาใน localStorage เมื่อเปลี่ยนแปลง
  useEffect(() => {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }, [schedule]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const time = `${hour}:${minute}`;

    if (schedule.includes(time)) {
      alert("เวลานี้ถูกตั้งแล้ว");
      return;
    }

    const updated = [...schedule, time].sort();
    setSchedule(updated);
  };

  const handleDelete = (t: string) => {
    setSchedule(schedule.filter((s) => s !== t));
  };

  // ชุดตัวเลือก ชั่วโมงและนาที (24h format)
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <div>
      <h1>Schedule</h1>
      <form onSubmit={handleAdd}>
        <div className="row g-2 mb-3">
          <div className="col-auto">
            <select
              className="form-select"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            >
              {hours.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <select
              className="form-select"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            >
              {minutes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
        </div>
      </form>

      <ul className="list-group">
        {schedule.map((t) => (
          <li
            key={t}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{t}</span>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(t)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}