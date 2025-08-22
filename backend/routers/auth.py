# routers/auth.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db_connection
import bcrypt

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(data: RegisterRequest):
    conn = get_db_connection()
    cur = conn.cursor()

    # ตรวจซ้ำ username
    cur.execute("SELECT 1 FROM users WHERE username = ?", data.username)
    if cur.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Username already exists")

    # แฮชรหัสผ่านก่อนบันทึก
    pw_hash = bcrypt.hashpw(data.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    cur.execute(
        "INSERT INTO users (username, password_hash) VALUES (?, ?)",
        data.username, pw_hash
    )
    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}

@router.post("/login")
def login(data: LoginRequest):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT id, password_hash FROM users WHERE username = ?", data.username)
    row = cur.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    _, stored_hash = row
    ok = bcrypt.checkpw(data.password.encode("utf-8"), stored_hash.encode("utf-8"))
    if not ok:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login success"}
