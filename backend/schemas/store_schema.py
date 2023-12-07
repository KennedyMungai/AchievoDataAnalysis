"""The stores schema file"""
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel
from schemas.employee_schema import ReadEmployee
from schemas.incident_schema import ReadIncident
from schemas.store_section_schema import ReadStoreSection


class StoreBase(BaseModel):
    """The base schema for the store data

    Args:
        BaseModel (Pydantic): The base class for all schemas
    """
    store_name: str
    store_location: str
    
    region_id: int


class CreateStore(StoreBase):
    """The schema used to create stores

    Args:
        StoreBase (Pydantic): The schema used to create stores
    """
    pass


class ReadStore(StoreBase):
    """The schema used to retrieve data from the database

    Args:
        StoreBase (Pydantic): The base schema for the stores data
    """
    store_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    incident: List[ReadIncident]
    store_sections: List[ReadStoreSection]
    employees: List[ReadEmployee]

    class Config:
        """The configuration class for the schema"""
        from_attributes = True


class UpdateStore(BaseModel):
    """The schema used to update the store data

    Args:
        BaseModel (Pydantic): The base class for all schemas
    """
    store_name: Optional[str] = None
    store_location: Optional[str] = None

    class Config:
        """Config class for when retrieving data from the database
        """
        from_attributes = True
