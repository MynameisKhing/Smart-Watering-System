import { useState } from "react";
import "./BoardManagement.css";

type Board = {
  id: string;
  name: string;
  status: "online" | "offline";
  network: string;
  schedule?: {
    time: string;
    duration: number;
    days: string[];
    active: boolean;
    updateMode: "immediate" | "scheduled";
    updateAt?: string;
  };
};

const DAYS = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"];

export default function BoardManagement() {
  const [boards, setBoards] = useState<Board[]>([
    { id: "ESP123456", name: "บอร์ด 1", status: "online", network: "WiFi" },
    { id: "ESP789012", name: "บอร์ด 2", status: "offline", network: "-" },
  ]);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [tempSchedule, setTempSchedule] = useState<{
    time: string;
    duration: number;
    days: string[];
    active: boolean;
    updateMode: "immediate" | "scheduled";
    updateAt: string;
  }>({
    time: "22:00",
    duration: 15,
    days: [],
    active: true,
    updateMode: "immediate",
    updateAt: "23:00",
  });

  const networks = ["WiFi", "LoRa", "4G"];

  const addBoard = () => {
    const newBoard: Board = {
      id: `ESP${Math.floor(Math.random() * 1000000)}`,
      name: `บอร์ด ${boards.length + 1}`,
      status: "offline",
      network: "-",
    };
    setBoards([...boards, newBoard]);
  };

  const removeBoard = (id: string) => {
    setBoards(boards.filter(b => b.id !== id));
    if (selectedBoardId === id) setSelectedBoardId(null);
  };

  const updateBoard = (id: string, field: keyof Board, value: any) => {
    setBoards(boards.map(b => (b.id === id ? { ...b, [field]: value } : b)));
  };

  const toggleDay = (day: string) => {
    setTempSchedule(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day],
    }));
  };

  const handleOpenSchedule = (board: Board) => {
    setSelectedBoardId(board.id);
    const s = board.schedule;
    setTempSchedule(
      s
        ? {
            time: s.time ?? "22:00",
            duration: s.duration ?? 15,
            days: s.days ?? [],
            active: s.active ?? true,
            updateMode: s.updateMode ?? "immediate",
            updateAt: s.updateAt ?? "23:00",
          }
        : {
            time: "22:00",
            duration: 15,
            days: [],
            active: true,
            updateMode: "immediate",
            updateAt: "23:00",
          }
    );
  };

  const handleSaveSchedule = (boardId: string) => {
    setBoards(boards.map(b =>
      b.id === boardId ? {
        ...b,
        schedule: { ...tempSchedule },
      } : b
    ));
    setSelectedBoardId(null);
  };

  const handleCancelSchedule = () => {
    setSelectedBoardId(null);
  };

  return (
    <div className="board-management">
      <h1>จัดการบอร์ดในระบบ</h1>
      <table>
        <thead>
          <tr>
            <th>UID</th>
            <th>ชื่อบอร์ด</th>
            <th>สถานะ</th>
            <th>เครือข่าย</th>
            <th>การตั้งค่า</th>
            <th>การกระทำ</th>
          </tr>
        </thead>
        <tbody>
          {boards.map(board => (
            <>
              <tr key={board.id}>
                <td>{board.id}</td>
                <td>
                  <input
                    type="text"
                    value={board.name}
                    onChange={e => updateBoard(board.id, "name", e.target.value)}
                  />
                </td>
                <td>
                  <div className={`status-badge ${board.status}`}>
                    {board.status === "online" ? "Online" : "Offline"}
                  </div>
                </td>
                <td>
                  <select
                    value={board.network}
                    onChange={e => updateBoard(board.id, "network", e.target.value)}
                  >
                    <option value="-">-</option>
                    {networks.map(net => (
                      <option key={net} value={net}>{net}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button className="btn-add" onClick={() => handleOpenSchedule(board)}>ตั้งเวลา</button>
                  <button className="btn-add" onClick={() => alert(`การตั้งค่าของ ${board.name}: ${board.schedule ? JSON.stringify(board.schedule) : "ยังไม่ได้ตั้งค่า"}`)}>รายละเอียด</button>
                </td>
                <td>
                  <button className="btn-delete" onClick={() => removeBoard(board.id)}>ลบ</button>
                </td>
              </tr>
              {selectedBoardId === board.id && (
                <tr className="schedule-row">
                  <td colSpan={6}>
                    <div className="schedule-form">
                      <h3 className="schedule-title">กำหนดการให้น้ำสำหรับ {board.name}</h3>
                      <div className="schedule-form-group">
                        <label>
                          เวลา:
                          <input
                            type="time"
                            value={tempSchedule.time}
                            onChange={e => setTempSchedule({ ...tempSchedule, time: e.target.value })}
                          />
                        </label>
                        <label>
                          ระยะเวลา (นาที):
                          <input
                            type="number"
                            min={1}
                            value={tempSchedule.duration}
                            onChange={e => setTempSchedule({ ...tempSchedule, duration: Number(e.target.value) })}
                          />
                        </label>
                      </div>
                      <div className="schedule-days-list">
                        {DAYS.map(day => (
                          <label key={day} className="day-checkbox">
                            <input
                              type="checkbox"
                              checked={tempSchedule.days.includes(day)}
                              onChange={() => toggleDay(day)}
                            />
                            {day}
                          </label>
                        ))}
                      </div>
                      <div className="schedule-form-group schedule-update-options">
                        <label>
                          <input
                            type="radio"
                            name="updateMode"
                            checked={tempSchedule.updateMode === "immediate"}
                            onChange={() => setTempSchedule({ ...tempSchedule, updateMode: "immediate" })}
                          />
                          อัปเดตทันที
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="updateMode"
                            checked={tempSchedule.updateMode === "scheduled"}
                            onChange={() =>
                              setTempSchedule({
                                ...tempSchedule,
                                updateMode: "scheduled",
                                updateAt: tempSchedule.updateAt ?? "23:00",
                              })
                            }
                          />
                          อัปเดตตามเวลา
                        </label>
                        {tempSchedule.updateMode === "scheduled" && (
                          <label className="update-time">
                            เวลาอัปเดต:
                            <input
                              type="time"
                              value={tempSchedule.updateAt}
                              onChange={e =>
                                setTempSchedule({ ...tempSchedule, updateAt: e.target.value })
                              }
                            />
                          </label>
                        )}
                      </div>
                      <div className="schedule-form-actions">
                        <button className="btn-save" onClick={() => handleSaveSchedule(board.id)}>บันทึก</button>
                        <button className="btn-cancel" onClick={handleCancelSchedule}>ยกเลิก</button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
      <button className="btn-add" onClick={addBoard}>เพิ่มบอร์ดใหม่</button>
    </div>
  );
}
