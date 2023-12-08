"""The router file for the employee data"""
from typing import List

from database.db import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas.employee_schema import (CreateEmployee, ReadEmployee,
                                     UpdateEmployee)
from services.employee_services import (create_employee_service,
                                        delete_employee_service,
                                        retrieve_all_employees_service,
                                        retrieve_one_employee_service,
                                        update_employee_service)
from sqlalchemy.orm import Session

employees_router = APIRouter(prefix="/employees", tags=["Employees"])


@employees_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_employee_endpoint(
    _employee_data: CreateEmployee,
    _db: Session = Depends(get_db)
) -> ReadEmployee:
    """The endpoint to create an employee

    Args:
        _employee_data (CreateEmployee): The data used to create an employee
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if the employee could not be created

    Returns:
        ReadEmployee: The data of the newly created employee
    """
    try:
        return await create_employee_service(_employee_data, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@employees_router.get("/", response_model=List[ReadEmployee])
async def retrieve_all_employees_endpoint(
    _db: Session = Depends(get_db)
) -> List[ReadEmployee]:
    """An endpoint to retrieve all the employees from the database

    Args:
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400n is raised incase anything goes wrong

    Returns:
        List[ReadEmployee]: A list of all the employees in the database.
    """
    try:
        return await retrieve_all_employees_service(_db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@employees_router.get("/{_employee_id}", response_model=ReadEmployee)
async def retrieve_one_employee_endpoint(
    _employee_id: int,
    _db: Session = Depends(get_db)
) -> ReadEmployee:
    """The endpoint to retrieve one employee from the database

    Args:
        _employee_id (int): The id of the employee
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if the employee could not be retrieved

    Returns:
        ReadEmployee: The data of the employee
    """
    try:
        return await retrieve_one_employee_service(_employee_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@employees_router.put(
    "/{_employee_id}",
    response_model=ReadEmployee,
    status_code=status.HTTP_202_ACCEPTED
)
async def update_employee_endpoint(
    _employee_id: int,
    _employee_data: UpdateEmployee,
    _db: Session = Depends(get_db)
) -> ReadEmployee:
    """The endpoint to update employee data from the database

    Args:
        _employee_id (int): The id of the employee to update.
        _employee_data (UpdateEmployee): The data to update the employee with.
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if the employee could not be updated

    Returns:
        ReadEmployee: The data of the updated employee
    """
    try:
        return await update_employee_service(_employee_id, _employee_data, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@employees_router.delete("/{_employee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_employee_endpoint(
    _employee_id: int,
    _db: Session = Depends(get_db)
) -> None:
    """The endpoint to delete an employee from the database

    Args:
        _employee_id (int): The id of an employee
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised in case the endpoint fails

    Returns:
        _type_: _description_
    """
    try:
        return await delete_employee_service(_employee_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
