
from fastapi import Depends, FastAPI, Header, HTTPException
from lib.main import register

from .api import users
from starlette.staticfiles import StaticFiles

app = FastAPI()

app.include_router(users.router)
app.mount("/", StaticFiles(directory="app/static"), name="static")

register()