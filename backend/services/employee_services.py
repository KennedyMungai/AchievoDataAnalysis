"""The employee service file for employee CRUD operations"""
from typing import List

from models.models import Employees
from schemas.employee_schema import (CreateEmployee, ReadEmployee,
                                     UpdateEmployee)
from sqlalchemy.orm import Session
from utils.password_hashing import hash_password


async def create_employee_service(_employee_data: CreateEmployee, _db: Session) -> ReadEmployee:
    """The service function to create an employee in the database

    Args:
        _employee_data (CreateEmployee): The data used to create an
        _db (Session): The database session

    Returns:
        ReadEmployee: The newly created employee
    """
    _employee_data.employee_password = hash_password(
        _employee_data.employee_password)

    new_employee = Employees(**_employee_data.model_dump())

    _db.add(new_employee)
    _db.commit()
    _db.refresh(new_employee)

    return new_employee


async def retrieve_all_employees_service(_db: Session) -> List[ReadEmployee]:
    """The service function to retrieve all employees from the database

    Args:
        _db (Session): The database session

    Returns:
        List[ReadEmployee]: The list of all employees
    """

    return _db.query(Employees).all()


async def retrieve_one_employee_service(
    _employee_id: int, _db: Session
) -> ReadEmployee:
    """The service function to retrieve one employee

    Args:
        _employee_id (int): The id of the employee
        _db (Session): The database session

    Returns:
        ReadEmployee: The retrieved employee
    """
    return _db.query(Employees).filter(Employees.employee_id == _employee_id).first()


async def update_employee_service(
    _employee_id: int, _update_employee_data: UpdateEmployee, _db: Session
) -> ReadEmployee:
    """The service function to update an employee in the database

    Args:
        _employee_id (int): The id of the employee
        _update_employee_data (UpdateEmployee): The data needed to update the employee
        _db (Session): The database session

    Returns:
        ReadEmployee: The updated employee
    """
    employee_to_update = await retrieve_one_employee_service(_employee_id, _db)

    if _update_employee_data.employee_name:
        employee_to_update.employee_name = _update_employee_data.employee_name
    if _update_employee_data.employee_email:
        employee_to_update.employee_email = _update_employee_data.employee_email
    if _update_employee_data.employee_phone_number:
        employee_to_update.employee_phone_number = _update_employee_data.employee_phone_number
    if _update_employee_data.employee_job_title:
        employee_to_update.employee_job_title = _update_employee_data.employee_job_title
    if _update_employee_data.employee_password:
        employee_to_update.employee_password = hash_password(
            _update_employee_data.employee_password)
    if _update_employee_data.store_id:
        employee_to_update.store_id = _update_employee_data.store_id
    if _update_employee_data.region_id:
        employee_to_update.region_id = _update_employee_data.region_id

    _db.commit()
    _db.refresh(employee_to_update)

    return employee_to_update


async def delete_employee_service(_employee_id: int, _db: Session) -> None:
    """The service function to delete an employee from the database

    Args:
        _employee_id (int): The id of the employee
        _db (Session): The database session

    Returns:
        ReadEmployee: The deleted employee
    """
    employee = await retrieve_one_employee_service(_employee_id, _db)

    if not employee:
        return None

    _db.delete(employee)
    _db.commit()

    return None
