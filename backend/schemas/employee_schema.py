"""The schema file for the employees"""
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr


class EmployeeBase(BaseModel):
    """The base class for the employees

    Args:
        BaseModel (Pydantic): The base class for all schemas
    """
    employee_name: str
    employee_email: EmailStr
    employee_phone_number: str
    employee_job_title: str
    employee_password: str
    store_id: int
    region_id: int


class CreateEmployee(EmployeeBase):
    """The schema used to create employees in the database

    Args:
        EmployeeBase (Pydantic): The base schema for the employee data
    """
    pass


class ReadEmployee(EmployeeBase):
    """The schema for reading employees

    Args:
        EmployeeBase (Pydantic): The base schema for the employee data
    """
    employee_id: int
    created_at: datetime
    updated_at: datetime

    # incidents

    class Config:
        """The config subclass for reading data from the database
        """
        from_attributes = True


class UpdateEmployee(BaseModel):
    """The schema used to update employee data

    Args:
        BaseModel (Pydantic): The base class for all schemas
    """
    employee_name: Optional[str]
    employee_email: Optional[EmailStr]
    employee_phone_number: Optional[str]
    employee_job_title: Optional[str]
    employee_password: Optional[str]
    store_id: Optional[int]
    region_id: Optional[int]

    class Config:
        """The config subclass for reading data from the database
        """
        from_attributes = True
