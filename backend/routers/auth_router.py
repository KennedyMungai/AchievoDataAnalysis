"""The auth router"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from database.db import get_db
from sqlalchemy.orm import Session
from models.models import Employees
from utils.password_hashing import verify_password
from utils.oauth2 import create_access_token


auth_route = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


async def login(
    _employee_credentials: OAuth2PasswordRequestForm = Depends(),
    _db: Session = Depends(get_db)
):
    """The login endpoint

    Args:
        _employee_credentials (OAuth2PasswordRequestForm, optional): The employee credentials. Defaults to Depends().
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 401 is raised if the employee email is not found
        HTTPException: A 401 is raised if the employee password does not match

    Returns:
        Dict: The dict containing the token
    """
    employee = _db.query(Employees).filter(
        Employees.employee_email == _employee_credentials.username).first()

    if not employee:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")

    if not verify_password(_employee_credentials.password, employee.employee_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")

    data = {"employee_id": employee.employee_id}

    access_token = create_access_token(data=data)

    return {"access_token": access_token, "token_type": "bearer"}
