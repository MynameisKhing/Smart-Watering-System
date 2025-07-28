from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db_connection

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(data: RegisterRequest):
    conn = get_db_connection()
    cur = conn.cursor()
    # ตรวจสอบ email ซ้ำ
    cur.execute("SELECT 1 FROM users WHERE email = ?", data.email)
    if cur.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Email already exists")
    # บันทึกผู้ใช้ใหม่
    cur.execute(
        "INSERT INTO users (email, password) VALUES (?, ?)",
        data.email, data.password
    )
    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}

@router.post("/login")
def login(data: LoginRequest):
    conn = get_db_connection()
    cur = conn.cursor()
    # ตรวจสอบ credential
    cur.execute(
        "SELECT id FROM users WHERE email = ? AND password = ?",
        data.email, data.password
    )
    user = cur.fetchone()
    conn.close()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login success"}
