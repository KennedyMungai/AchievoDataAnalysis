"""The file with the JWT logic"""
import os
from datetime import datetime, timedelta

from database.db import get_db
from dotenv import find_dotenv, load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from services.employee_services import retrieve_one_employee_service
from sqlalchemy.orm import Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

load_dotenv(find_dotenv())

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES"))


async def create_access_token(data: dict):
    """The function used to create access tokens

    Args:
        data (dict): The data encoded in the token

    Returns:
        Dict: A dictionary
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def verify_access_token(_token: str, credentials_exception):
    """The function used to verify access tokens

    Args:
        _token (str): The token to verify
        credentials_exception (Exception): The exception to raise

    Raises:
        credentials_exception: The exception to raise

    Returns:
        int: The user ID
    """
    try:
        payload = jwt.decode(_token, SECRET_KEY, algorithms=[ALGORITHM])
        _id = payload.get("employee_id")

        if _id is None:
            raise credentials_exception
    except JWTError as exc:
        raise credentials_exception from exc

    return _id

async def get_current_user(_token: str = Depends(oauth2_scheme), _db: Session = Depends(get_db)):
    """The function used to get the current user

    Args:
        _token (str, optional): The token to verify. Defaults to Depends(oauth2_scheme).
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Returns:
        Employees: The user
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    _id = await verify_access_token(_token, credentials_exception)
    _user = await retrieve_one_employee_service(_id, _db)

    return _user
