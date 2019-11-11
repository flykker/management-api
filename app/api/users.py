from fastapi import APIRouter
from lib.db import db as orm
from tinydb import Query

router = APIRouter()


@router.get("/users", tags=["Users"])
async def read_users():
    return orm.query("users").all()


@router.get("/users/{username}", tags=["Users"])
async def read_user(username: str):
    user = Query()
    return orm.query("users").get(user.username == username)
