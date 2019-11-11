
from fastapi import Depends, FastAPI, Header, HTTPException
from lib.main import register

from .api import users, core
from starlette.staticfiles import StaticFiles

app = FastAPI()

app.include_router(core.router)
app.include_router(users.router)
register()

app.mount("/", StaticFiles(directory="app/static/app",
                           html=True), name="home")
#app.mount("/static", StaticFiles(directory="app/static/app/"), name="static")
