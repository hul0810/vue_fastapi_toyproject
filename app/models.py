from sqlalchemy import Column, Integer, VARCHAR, DateTime, func
from database import Base

class BaseMixin:
  create_at = Column(DateTime, nullable=False, default=func.utc_timestamp())
  update_at = Column(DateTime, nullable=False, default=func.utc_timestamp(), onupdate=func.utc_timestamp())

class User(Base):
  __tablename__ = "users"
  id=Column(Integer, primary_key=True)
  email=Column(VARCHAR(41), unique=True, nullable=False)
  password=Column(VARCHAR(60), nullable=False)
  username=Column(VARCHAR(41), nullable=False)
