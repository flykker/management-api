
from fastapi import Depends, FastAPI, Header, HTTPException
from lib.main import register

from api import users

app = FastAPI()

app.include_router(users.router)

register()