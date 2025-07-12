import { useState } from "react";

export default function Design() {
  const [network, setNetwork] = useState("");
  const [devices, setDevices] = useState<string[]>([]);

  const handleDeviceChange = (device: string) => {
    setDevices(prev =>
      prev.includes(device) ? prev.filter(d => d !== device) : [...prev, device]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert(
      `เลือกเครือข่าย: ${network}\nอุปกรณ์ที่เลือก: ${devices.join(", ")}`
    );
  };

  return (
    <div className="container">
      <h1>ออกแบบระบบรดน้ำ</h1>

      <form onSubmit={handleSubmit}>
        <h3>เลือกเครือข่ายที่ต้องการ</h3>
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          required
        >
          <option value="">-- กรุณาเลือก --</option>
          <option value="Wi-Fi">Wi-Fi</option>
          <option value="4G/5G">4G/5G (ซิมการ์ด)</option>
          <option value="LoRa">LoRa / LoRaWAN</option>
        </select>

        <h3>เลือกอุปกรณ์ที่ต้องการ</h3>
        <label>
          <input
            type="checkbox"
            checked={devices.includes("Soil Moisture Sensor")}
            onChange={() => handleDeviceChange("Soil Moisture Sensor")}
          />
          Soil Moisture Sensor
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={devices.includes("Temperature/Humidity Sensor")}
            onChange={() => handleDeviceChange("Temperature/Humidity Sensor")}
          />
          Temperature / Humidity Sensor
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={devices.includes("Relay Module")}
            onChange={() => handleDeviceChange("Relay Module")}
          />
          Relay Module
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={devices.includes("Pump/Solenoid Valve")}
            onChange={() => handleDeviceChange("Pump/Solenoid Valve")}
          />
          Pump / Solenoid Valve
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={devices.includes("Raspberry Pi")}
            onChange={() => handleDeviceChange("Raspberry Pi")}
          />
          Raspberry Pi / Server
        </label>

        <br /><br />
        <button type="submit">ยืนยันการออกแบบ</button>
      </form>
    </div>
  );
}
