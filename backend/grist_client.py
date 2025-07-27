import os
import httpx
from dotenv import load_dotenv

load_dotenv()

GRIST_API_KEY = os.getenv("GRIST_API_KEY")
GRIST_DOC_ID = os.getenv("GRIST_DOC_ID")
BASE_URL = f"https://docs.getgrist.com/api/docs/{GRIST_DOC_ID}"

HEADERS = {
    "Authorization": f"Bearer {GRIST_API_KEY}"
}

async def get_boards():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/tables/Boards/records", headers=HEADERS)
        return response.json()
