from fastapi import APIRouter
from lib.db import db as orm
from lib.main import get_modules
from tinydb import Query
from starlette.responses import Response

router = APIRouter()

@router.get("/modules/modules.js", tags=["Modules"])
def read_modules():
    modules = get_modules()
    data = "var modules = " + str(modules) 
    
    return Response(content=data, media_type="application/javascript")