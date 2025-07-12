import React, { useState } from "react";
import "./Design.css";

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
    <div id="webcrumbs">
      <div className="w-full max-w-2xl mx-auto p-6 bg-white">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg border border-green-100">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">ออกแบบระบบรดน้ำ</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
          </header>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <section className="space-y-4">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                ประเภทเครือข่าย
              </label>
              <select
                className="w-full p-4 bg-white border-2 border-green-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 shadow-sm"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                required
              >
                <option value="">-- กรุณาเลือก --</option>
                <option value="Wi-Fi">Wi-Fi</option>
                <option value="4G/5G">4G/5G</option>
                <option value="LoRa">LoRa</option>
                <option value="Zigbee">Zigbee</option>
                <option value="Bluetooth">Bluetooth</option>
                <option value="GSM/LTE">GSM/LTE</option>
              </select>
            </section>

            <section className="space-y-4">
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                เลือกอุปกรณ์
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Soil Sensor", "Humidity Sensor", "Relay Module", "Pump", "Raspberry Pi"].map((d) => (
                  <label
                    key={d}
                    className="flex items-center p-4 bg-white border-2 border-green-200 rounded-xl hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all duration-300"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-green-600 border-2 border-green-300 rounded focus:ring-green-500 focus:ring-2 mr-4"
                      checked={devices.includes(d)}
                      onChange={() => handleDeviceChange(d)}
                    />
                    <span className="text-gray-700 font-medium">{d}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                ยืนยัน
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}
