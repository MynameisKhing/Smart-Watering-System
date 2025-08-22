import { useState, useEffect } from "react";
//import axios from "axios"; // Kept for potential future use
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import "../style/Monitoring.css";

export default function Monitoring() {
  const [waterUsageData, setWaterUsageData] = useState([
    { time: "08:00", zone1: 10, zone2: 5, zone3: 8, zone4: 12 },
    { time: "09:00", zone1: 20, zone2: 10, zone3: 15, zone4: 18 },
    { time: "10:00", zone1: 32, zone2: 15, zone3: 21, zone4: 30 },
    { time: "11:00", zone1: 25, zone2: 12, zone3: 18, zone4: 22 },
    { time: "12:00", zone1: 40, zone2: 20, zone3: 25, zone4: 35 },
    { time: "13:00", zone1: 20, zone2: 10, zone3: 35, zone4: 55 },
    { time: "14:00", zone1: 50, zone2: 30, zone3: 35, zone4: 40 },
    { time: "15:00", zone1: 30, zone2: 20, zone3: 20, zone4: 12 },
    { time: "16:00", zone1: 50, zone2: 30, zone3: 15, zone4: 40 },
    { time: "17:00", zone1: 15, zone2: 10, zone3: 18, zone4: 23 },
    { time: "18:00", zone1: 40, zone2: 20, zone3: 25, zone4: 35 },

  ]);

  const [moistureBoards, setMoistureBoards] = useState([
    { id: "ตะไคร้", moisture: "32%" },
    { id: "มะเขือเทศ", moisture: "15%" },
    { id: "ผักบุ้ง", moisture: "21%" },
    { id: "กล้วยหอม", moisture: "30%" },
  ]);
  const [valves, setValves] = useState([
    { id: "ตะไคร้", status: "ON" },
    { id: "มะเขือเทศ", status: "OFF" },
    { id: "ผักบุ้ง", status: "ON" },
    { id: "กล้วยหอม", status: "OFF" },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState(25.5);
  const [pH, setPH] = useState(7.2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Randomize moisture, temperature, and pH every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMoistureBoards(prevBoards =>
        prevBoards.map(board => ({
          ...board,
          moisture: `${Math.min(100, Math.max(0, Math.round(Math.random() * 100)))}%`,
        }))
      );
      setTemperature(prev => Math.min(30, Math.max(20, prev + (Math.random() - 0.5) * 2)));
      setPH(prev => Math.min(8, Math.max(6, prev + (Math.random() - 0.5) * 0.5)));
    }, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Placeholder to use setWaterUsageData and setMoistureBoards at least once
  useEffect(() => {
    // Commenting out axios call as it's not currently needed for mock data
    // axios.get("http://localhost:8000/monitoring")
    //   .then(res => {
    //     const data = res.data.records;
    //     setMoistureBoards(data.map((d: any) => ({ id: d.fields.id, moisture: d.fields.moisture + "%" })));
    //     setValves(data.map((d: any) => ({ id: d.fields.id, status: d.fields.valveStatus })));
    //   })
    //   .catch(err => console.error("โหลดข้อมูล monitoring ล้มเหลว", err));
  }, []);

  // Calculate total water usage for each time point
  const totalWaterUsageData = waterUsageData.map(data => ({
    time: data.time,
    total: data.zone1 + data.zone2 + data.zone3 + data.zone4,
  }));

  return (
    <div className="monitoring-container">
      <div className="dashboard-header">
        <h1>ข้อมูลการใช้น้ำ</h1>
        <span className="dashboard-time">
          {currentTime.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      <div className="monitoring-grid">
        <div className="card graph-section" style={{ gridColumn: "span 3" }}>
          <div className="card-header">
            <h2>ปริมาณน้ำที่ใช้ (ลิตร) <i className="fas fa-chart-line"></i></h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={totalWaterUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background: '#ffffff', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="total" stroke="#228cc5ff" strokeWidth={2} name="ปริมาณน้ำที่ใช้" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card moisture-section">
          <div className="card-header">
            <h2>ความชื้นภายในดิน <i className="fas fa-leaf"></i></h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>ชื่อแปลง</th>
                <th>ค่าความชื้น</th>
              </tr>
            </thead>
            <tbody>
              {moistureBoards.map(board => (
                <tr key={board.id}>
                  <td>{board.id}</td>
                  <td>{board.moisture}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card valve-section">
          <div className="card-header">
            <h2>สถานะของวาล์ว <i className="fas fa-cog"></i></h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>วาล์ว</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {valves.map((valve) => (
                <tr key={valve.id}>
                  <td>{valve.id}</td>
                  <td>
                    <span className={`status ${valve.status.toLowerCase()}`}>
                      {valve.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card valve-section">
          <div className="card-header">
            <h2>น้ำภายในบ่อเก็บน้ำ <i className="fas fa-cog"></i></h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>พารามิเตอร์</th>
                <th>ค่า</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>อุณหภูมิ (°C)</td>
                <td>{temperature.toFixed(1)}</td>
              </tr>
              <tr>
                <td>ค่าความเป็นกรด (pH)</td>
                <td>{pH.toFixed(1)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
