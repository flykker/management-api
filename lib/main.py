import importlib
import os
from os import listdir
from os.path import isdir, join
import sys
from fastapi import Depends, FastAPI, Header, HTTPException


async def get_token_header(x_token: str = Header(...)):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")

def register():
    current_dir = os.getcwd()
    modules_dir = os.path.join(current_dir, 'modules')
    modules = [
        path for path in listdir(modules_dir) 
        if (isdir(join(modules_dir, path)) and path != '__pycache__') 
    ]
    print(modules)

    for module in modules:
        module_name = module;
        modimp = importlib.import_module('modules.'+ module_name + '.main')
        sys.modules[module_name] = modimp
        #print(dir(modimp))
