from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, boards, sensors   # 👈 เพิ่ม sensors

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(boards.router)
app.include_router(sensors.router)   # 👈 เพิ่ม router ใหม่
