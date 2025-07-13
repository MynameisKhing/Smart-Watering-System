import { useState } from "react";
import "./BoardManagement.css";

type Board = {
  id: string;
  name: string;
  status: "online" | "offline";
  network: string;
};

export default function BoardManagement() {
  const [boards, setBoards] = useState<Board[]>([
    { id: "ESP123456", name: "บอร์ด 1", status: "online", network: "WiFi" },
    { id: "ESP789012", name: "บอร์ด 2", status: "offline", network: "-" },
  ]);

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
  };

  const updateBoard = (id: string, field: keyof Board, value: string) => {
    setBoards(boards.map(b => (b.id === id ? { ...b, [field]: value } : b)));
  };

  return (
    <div className="board-management">
      <h1>จัดการบอร์ด ESP</h1>
      <table>
        <thead>
          <tr>
            <th>UID</th>
            <th>ชื่อบอร์ด</th>
            <th>สถานะ</th>
            <th>เครือข่าย</th>
            <th>การกระทำ</th>
          </tr>
        </thead>
        <tbody>
          {boards.map(board => (
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
                <button className="btn-delete" onClick={() => removeBoard(board.id)}>
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-add" onClick={addBoard}>
        เพิ่มบอร์ดใหม่
      </button>
    </div>
  );
}
