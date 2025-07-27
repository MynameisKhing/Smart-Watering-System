from fastapi import FastAPI
from grist_client import get_boards

app = FastAPI()

@app.get("/boards")
async def list_boards():
    return await get_boards()
