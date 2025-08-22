# database.py
import os
from pathlib import Path
import pyodbc
from dotenv import load_dotenv

# โหลด .env ที่อยู่ข้างไฟล์นี้โดยตรง
env_path = Path(__file__).with_name('.env')
load_dotenv(dotenv_path=env_path)

conn_str = os.getenv("DATABASE_URL")

def get_db_connection():
    if not conn_str:
        raise RuntimeError(
            "DATABASE_URL is empty. Please create backend/.env with a valid ODBC connection string."
        )
    return pyodbc.connect(conn_str)
