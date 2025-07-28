# routers/boards.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from database import get_db_connection

router = APIRouter(prefix="/boards", tags=["boards"])

class BoardIn(BaseModel):
    uid: str
    network: str
    status: str
    name: Optional[str] = None

class Board(BoardIn):
    id: int

@router.post("/", response_model=Board)
def register_board(data: BoardIn):
    conn = get_db_connection()
    cur = conn.cursor()
    # ถ้า uid มีอยู่แล้ว ให้ update status/network/name
    cur.execute("SELECT id FROM boards WHERE uid = ?", data.uid)
    if cur.fetchone():
        cur.execute(
            "UPDATE boards SET network = ?, status = ?, name = ? WHERE uid = ?",
            data.network, data.status, data.name, data.uid
        )
    else:
        cur.execute(
            "INSERT INTO boards (uid, network, status, name) VALUES (?, ?, ?, ?)",
            data.uid, data.network, data.status, data.name
        )
    conn.commit()
    # ดึงข้อมูลกลับมา
    cur.execute(
        "SELECT id, uid, network, status, name FROM boards WHERE uid = ?",
        data.uid
    )
    row = cur.fetchone()
    conn.close()

    return {"id": row[0], "uid": row[1], "network": row[2], "status": row[3], "name": row[4]}

@router.get("/", response_model=List[Board])
def list_boards():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, uid, network, status, name FROM boards")
    boards = [
        {"id": r[0], "uid": r[1], "network": r[2], "status": r[3], "name": r[4]}
        for r in cur.fetchall()
    ]
    conn.close()
    return boards
