import { useState, useEffect } from "react";

export default function Monitoring() {
  const [soilMoisture] = useState(45);
  const [pumpStatus] = useState("OFF");
  const [watering, setWatering] = useState(false);
  const [schedule, setSchedule] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("schedule");
    if (saved) setSchedule(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      const current = `${hh}:${mm}`;
      if (schedule.includes(current)) {
        setWatering(true);
        if (Notification.permission === "granted") {
          new Notification("Smart Watering", { body: "กำลังรดน้ำ" });
        }
      } else {
        setWatering(false);
      }
    };

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    checkTime();
    const intervalId = setInterval(checkTime, 60000);
    return () => clearInterval(intervalId);
  }, [schedule]);

  return (
    <div>
      <h1>Monitoring</h1>
      {watering && <div className="alert alert-info">กำลังรดน้ำ</div>}
      <p>Soil moisture: {soilMoisture}%</p>
      <p>Pump: {pumpStatus}</p>
      <button className="btn btn-primary">Water Now</button>
    </div>
  );
}