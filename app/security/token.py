from fastapi import status, HTTPException

from jose import jwt, JWTError
from datetime import datetime, timedelta

from common import token_info

def create_token(data: dict, expires_delta: int = None):
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.utcnow() + expires_delta
  else:
    expire = datetime.utcnow() + timedelta(minutes=15)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, token_info.SECRET_KEY, algorithm=token_info.ALGORITHM)
  return encoded_jwt

def verify_token(token: str):
  # 중복 되는 코드, datail만 다름, 어떻게 해결?
  credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"}
  )
  token_expire = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Signature has expired.",
    headers={"WWW-Authenticate": "Bearer"}
  ) 
  try:
    payload = jwt.decode(token, token_info.SECRET_KEY, algorithms=[token_info.ALGORITHM])
    username: str = payload.get("sub")
    expire : int = payload.get("exp")
    if username is None:
      raise credentials_exception
    if expire is None:
      raise credentials_exception
  except JWTError:
    raise token_expire
  return payload