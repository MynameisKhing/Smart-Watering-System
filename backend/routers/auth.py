from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db_connection

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
    cur.execute("SELECT 1 FROM users WHERE username = ?", data.username)
    if cur.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Username already exists")
    cur.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        data.username, data.password
    )
    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}

@router.post("/login")
def login(data: LoginRequest):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute(
        "SELECT id FROM users WHERE username = ? AND password = ?",
        data.username, data.password
    )
    user = cur.fetchone()
    conn.close()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login success"}
