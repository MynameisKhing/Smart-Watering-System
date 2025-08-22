import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/Schedule.css";

const DAYS = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"];

export default function Schedule() {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();

  const [time, setTime] = useState("22:00");
  const [duration, setDuration] = useState(15);
  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    // ดึงข้อมูลบอร์ดจาก backend ตาม boardId แล้วเติมค่าเริ่มต้น
  }, [boardId]);

  const toggleDay = (day: string) => {
    setDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const handleSave = () => {
    // ส่งค่าไป backend แล้วกลับไปหน้า board manager
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="section-title">ตั้งเวลารดน้ำสำหรับ {boardId}</h2>

      <div className="schedule-form">
        <label>
          เวลา:
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        </label>
        <label>
          ระยะเวลา (นาที):
          <input
            type="number"
            min={1}
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="schedule-form">
        <span>เลือกวัน:</span>
        {DAYS.map(day => (
          <label key={day}>
            <input
              type="checkbox"
              checked={days.includes(day)}
              onChange={() => toggleDay(day)}
            />
            {day}
          </label>
        ))}
      </div>

      <div className="schedule-form">
        <button onClick={handleSave}>บันทึก</button>
        <button onClick={() => navigate("/")}>ยกเลิก</button>
      </div>
    </div>
  );
}
