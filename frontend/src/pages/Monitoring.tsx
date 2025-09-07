import { useState, useEffect } from "react";
import axios from "axios";
import "../style/Monitoring.css";

type SensorData = {
  board: string;
  temperature: number;
  ph: number;
  tds: number;
  soilMoisture: number;
};

export default function Monitoring() {
  const [data, setData] = useState<SensorData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:8000/sensors")
        .then((res) => setData(res.data))
        .catch((err) =>
          console.error("โหลดข้อมูล monitoring ล้มเหลว", err)
        );
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="monitoring-container">
      <div className="dashboard-header">
        <h1>ข้อมูลเซนเซอร์ที่ได้จาก {data?.board ?? "กำลังโหลด..."}</h1>
        <span className="dashboard-time">
          {currentTime.toLocaleDateString("th-TH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          {currentTime.toLocaleTimeString("th-TH")}
        </span>
      </div>

      {data ? (
        <div className="monitoring-grid">
          <div className="card sensor-card temp">
            <h2>อุณหภูมิของน้ำ (°C)</h2>
            <p className="sensor-value">{data.temperature.toFixed(1)} </p>
          </div>

          <div className="card sensor-card ph">
            <h2>ค่าความเป็นกรด-ด่างของน้ำ</h2>
            <p className="sensor-value">{data.ph.toFixed(2)}</p>
          </div>

          <div className="card sensor-card tds">
            <h2>ค่าความขุ่นของน้ำ (ppm)</h2>
            <p className="sensor-value">{data.tds}</p>
          </div>

          <div className="card sensor-card soil">
            <h2>ค่าความชื้นในดิน (%)</h2>
            <p className="sensor-value">{data.soilMoisture}</p>
          </div>
        </div>
      ) : (
        <p className="loading">กำลังโหลดข้อมูลจากบอร์ด...</p>
      )}
    </div>
  );
}
