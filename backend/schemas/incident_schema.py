"""The schema file for the incidents data"""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class IncidentBase(BaseModel):
    """The base schema for the incidents data

    Args:
        BaseModel (Pydantic): The base class for all schemas
    """
    incident_description: str
    product_name: str
    product_code: str
    product_quantity: int
    product_price: float
    total_value: float
    is_resolved: bool

    store_section_id: int
    employee_id: int
    store_id: int
    region_id: int


class CreateIncident(IncidentBase):
    """The schema used to create incidents in the database

    Args:
        IncidentBase (Pydantic): The base incident schema
    """


class ReadIncident(IncidentBase):
    """The schema used to read incidents from the database

    Args:
        IncidentBase (Pydantic): The base incidents schema
    """
    incident_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        """The config class for reading data from the database
        """
        from_attributes = True


class UpdateIncident(BaseModel):
    """The schema used to update incidents in the database

    Args:
        BaseModel (Pydantic): The base class for all schemas
    """
    incident_description: Optional[str]
    product_name: Optional[str]
    product_code: Optional[str]
    product_quantity: Optional[int]
    product_price: Optional[float]
    is_resolved: Optional[bool]

    class Config:
        """The config class for reading data from the database
        """
        from_attributes = True
