from fastapi import FastAPI

import models
from routers import (
  crud_test,
  authentication
)
from database import engine

tags_metadata = [
  {
    "name": "auth",
    "description": "Operations with user. The **login** logic is also here."
  }
]

app = FastAPI(
  title="Practice FastAPI",
  openapi_tags=tags_metadata
)

models.Base.metadata.create_all(bind=engine)

app.include_router(crud_test.router)
app.include_router(authentication.router)