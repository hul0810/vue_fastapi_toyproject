from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy import select, insert
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import NoResultFound

from database import get_db
from models import User
from schemas import UserCreate
from security.token import create_token
from security.hashing import Hash

router = APIRouter(
  tags=["auth"],
  prefix="/auth"
)

@router.post("/signin", status_code=status.HTTP_201_CREATED)
def sign_in(request: UserCreate, db: Session = Depends(get_db)):
  hashing_pwd = Hash.bcrypt(request.password)
  stmt = insert(User).values(
    username=request.username,
    password=hashing_pwd,
    email=request.email
  )
  db.execute(stmt)
  db.commit()
  # email 중복 에러 핸들링 필요
  return f"{request.username}님 환영합니다."

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  try: 
    stmt = select(User).where(User.email == form_data.username)
    user = db.execute(stmt).scalar_one()
    if not Hash.verify(form_data.password, user.password):
      raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect Password"
      )
  except NoResultFound:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="user not found"
    )
  data = {"email": form_data.username}
  access_token = create_token(data)
  return {"access_token": access_token}