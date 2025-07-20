import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import "./Monitoring.css";

export default function Monitoring() {
  const waterUsageData = [
    { time: "08:00", value: 10 },
    { time: "09:00", value: 20 },
    { time: "10:00", value: 30 },
    { time: "11:00", value: 25 },
    { time: "12:00", value: 40 },
  ];

  const mockBoards = [
    { id: "คะน้า", moisture: "45%" },
    { id: "ผักกาดขาว", moisture: "50%" },
    { id: "พริกขี้หนู", moisture: "40%" },
  ];

  const [valves, setValves] = useState([
    { id: "คะน้า", status: "ON" },
    { id: "ผักกาดขาว", status: "OFF" },
    { id: "พริกขี้หนู", status: "OFF" },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleValve = (index: number) => {
    setValves(valves.map((valve, idx) => {
      if (idx === index) {
        return {
          ...valve,
          status: valve.status === "ON" ? "OFF" : "ON"
        };
      }
      return valve;
    }));
  };

  return (
    <div className="monitoring-container">
      <div className="dashboard-header">
        <h1>ข้อมูลการใช้น้ำ</h1>
        <span className="dashboard-time">
          {currentTime.toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok' })} +07, {currentTime.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      <div className="monitoring-grid">
        <div className="card graph-section">
          <div className="card-header">
            <h2>ปริมาณน้ำที่ใช้ <i className="fas fa-chart-line"></i></h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={waterUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ background: '#ffffff', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card moisture-section">
          <div className="card-header">
            <h2>ความชื้นในดิน <i className="fas fa-leaf"></i></h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>ชื่อบอร์ด</th>
                <th>ค่าความชื้น</th>
              </tr>
            </thead>
            <tbody>
              {mockBoards.map(board => (
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
            <h2>ควบคุมการจ่ายน้ำ <i className="fas fa-cog"></i></h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>วาล์ว</th>
                <th>สถานะ</th>
                <th>ควบคุมการทำงาน</th>
              </tr>
            </thead>
            <tbody>
              {valves.map((valve, idx) => (
                <tr key={valve.id}>
                  <td>{valve.id}</td>
                  <td>
                    <span className={`status ${valve.status.toLowerCase()}`}>
                      {valve.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => toggleValve(idx)}>
                      เปิด / ปิด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}