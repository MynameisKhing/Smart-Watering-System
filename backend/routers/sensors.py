
from fastapi import APIRouter, HTTPException
import requests

router = APIRouter(prefix="/sensors", tags=["sensors"])

# 👉 ใส่ IP ของ ESP32 จาก Serial Monitor
ESP32_IP = "http://192.168.111.14"

@router.get("/")
def get_sensors():
    """
    ดึงข้อมูล sensor จาก ESP32 (board1) แล้วส่งต่อให้ frontend
    """
    try:
        r = requests.get(f"{ESP32_IP}/sensors", timeout=3)
        return r.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"อ่านค่าจาก ESP32 ไม่สำเร็จ: {e}")
