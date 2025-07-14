import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import "./Monitoring.css";

export default function Monitoring() {
  // mock ข้อมูลกราฟน้ำ
  const waterUsageData = [
    { time: "08:00", value: 10 },
    { time: "09:00", value: 20 },
    { time: "10:00", value: 30 },
    { time: "11:00", value: 25 },
    { time: "12:00", value: 40 },
  ];

  const mockBoards = [
    { id: "Board 1", moisture: "45%" },
    { id: "Board 2", moisture: "50%" },
    { id: "Board 3", moisture: "40%" },
  ];

  const [valves, setValves] = useState([
    { id: "Valve 1", status: "ON" },
    { id: "Valve 2", status: "OFF" },
    { id: "Valve 3", status: "OFF" },
  ]);

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
    <div id="webcrumbs">
      <div className="monitoring-container">
        <h1>Monitoring Dashboard</h1>

        {/* กราฟ */}
        <div className="graph-section">
          <h2>Water Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={waterUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ความชื้น */}
        <div className="moisture-section">
          <h2>Soil Moisture by Board</h2>
          <table>
            <thead>
              <tr>
                <th>Board</th>
                <th>Moisture</th>
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

        {/* วาล์ว */}
        <div className="valve-section">
          <h2>Valve Control</h2>
          <table>
            <thead>
              <tr>
                <th>Valve</th>
                <th>Status</th>
                <th>Action</th>
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
                      Toggle
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
