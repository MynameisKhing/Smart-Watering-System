from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_db_connection

router = APIRouter(prefix="/auth", tags=["auth"])

class User(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(user: User):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?", user.email)
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Email already exists")

    cursor.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                   user.name, user.email, user.password)
    conn.commit()
    conn.close()
    return {"message": "User registered successfully"}

@router.post("/login")
def login(data: LoginRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", data.email, data.password)
    user = cursor.fetchone()
    conn.close()

    if user:
        return {"message": "Login success"}
    raise HTTPException(status_code=401, detail="Invalid credentials")
