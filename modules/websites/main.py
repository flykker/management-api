from pydantic import BaseModel
from fastapi import FastAPI, APIRouter, HTTPException
from lib.main import get_token_header
from fastapi import Depends
from app.main import app
from starlette.staticfiles import StaticFiles
from lib.db import db as orm
from tinydb import Query

router = APIRouter()


class Website(BaseModel):
    username: str
    name: str
    home_path: str
    domain: str


@router.get("")
async def read_websites():
    user = Query()
    els = orm.query("websites").search(user.username == "user")
    for el in els:
        el.update(id=el.doc_id)
    return els


@router.get("/{website_id}")
async def read_website(website_id: str):
    user = Query()
    el = orm.query("websites").get(doc_id=website_id)
    el.update(id=el.doc_id)
    return el


@router.post("/edit/{website_id}")
async def update_website(website_id: int, website: Website):
    print(website.json())
    el = Query()
    if (orm.query("websites").get(doc_id=website_id)):
        print("update")
        result = orm.query("websites").update(website, doc_ids=[website_id])
    else:
        print("insert")
        result = orm.query("websites").insert(website)
    return result


app.include_router(
    router,
    prefix="/websites",
    tags=["Websites"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)
app.mount("/modules/websites",
          StaticFiles(directory="modules/websites/static/umd"), name="websites")
