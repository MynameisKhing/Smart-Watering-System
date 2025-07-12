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
    alert(`เลือกเครือข่าย: ${network}\nอุปกรณ์: ${devices.join(", ")}`);
  };

  return (
    <div>
      <h1>ออกแบบระบบรดน้ำ</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>เลือกเครือข่าย</label>
          <select
            className="form-select"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            required
          >
            <option value="">-- กรุณาเลือก --</option>
            <option value="Wi-Fi">Wi-Fi</option>
            <option value="4G/5G">4G/5G</option>
            <option value="LoRa">LoRa</option>
          </select>
        </div>

        <div className="mb-3">
          <label>เลือกอุปกรณ์</label>
          {["Soil Sensor", "Humidity Sensor", "Relay Module", "Pump", "Raspberry Pi"].map((d) => (
            <div className="form-check" key={d}>
              <input
                type="checkbox"
                className="form-check-input"
                id={d}
                checked={devices.includes(d)}
                onChange={() => handleDeviceChange(d)}
              />
              <label htmlFor={d} className="form-check-label">{d}</label>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-success">ยืนยัน</button>
      </form>
    </div>
  );
}
