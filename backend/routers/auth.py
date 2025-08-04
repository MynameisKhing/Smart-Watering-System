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

    # ตรวจสอบชื่อซ้ำ
    cur.execute("SELECT 1 FROM users WHERE username = ?", data.username)
    if cur.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Username already exists")

    # แฮชรหัสผ่านก่อนเก็บ
    hashed_pw = bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt())

    cur.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        data.username, hashed_pw
    )
    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}

@router.post("/login")
def login(data: LoginRequest):
    conn = get_db_connection()
    cur = conn.cursor()

    # ดึง password ที่ถูก hash มาเปรียบเทียบ
    cur.execute("SELECT id, password FROM users WHERE username = ?", data.username)
    row = cur.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    stored_hashed_password = row[1]
    if not bcrypt.checkpw(data.password.encode('utf-8'), stored_hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login success"}
