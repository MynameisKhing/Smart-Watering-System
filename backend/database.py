import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()
conn_str = os.getenv("DATABASE_URL")

def get_db_connection():
    return pyodbc.connect(conn_str)