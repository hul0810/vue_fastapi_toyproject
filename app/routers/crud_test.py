from fastapi import APIRouter, Depends

from sqlalchemy import select
from sqlalchemy.orm import Session

from schemas import UserInfo
from database import get_db
from models import User
from security.oauth2 import get_current_user

router = APIRouter(
  tags=["crud"],
  prefix="/crud"
)

@router.get("/{id}", response_model=UserInfo)
def one_user_info(id, db: Session = Depends(get_db), auth: str = Depends(get_current_user)):
  stmt = select(User).where(User.id == id)
  one_user = db.execute(stmt).scalar_one()
  return one_user
