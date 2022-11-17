from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
  username: str
  password: str
  confirm_password: str
  email: EmailStr

class UserInfo(BaseModel):
  username: str
  email: EmailStr
  class Config:
    orm_mode = True