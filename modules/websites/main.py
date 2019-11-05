from fastapi import FastAPI, APIRouter, HTTPException
from lib.main import get_token_header
from fastapi import Depends
from app.main import app
from starlette.staticfiles import StaticFiles

router = APIRouter()


@router.get("s")
async def read_items():
    return [{"name": "Item Foo"}, {"name": "item Bar"}]


@router.get("/{item_id}")
async def read_item(item_id: str):
    return {"name": "Fake Specific Item", "item_id": item_id}


@router.put("/{item_id}")
async def update_item(item_id: str):
    if item_id != "foo":
        raise HTTPException(
            status_code=403, detail="You can only update the item: foo")
    return {"item_id": item_id, "name": "The Fighters"}


app.include_router(
    router,
    prefix="/items",
    tags=["items"],
    dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)
app.mount("/modules/websites",
          StaticFiles(directory="modules/websites/static/umd"), name="websites")
