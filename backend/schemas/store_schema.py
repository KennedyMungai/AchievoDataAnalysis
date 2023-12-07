"""The stores schema file"""
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


class StoreBase(BaseModel):
    """The base schema for the store data

    Args:
        BaseModel (Pydantic): The base class for all schemas
    """
    store_name: str
    store_location: str


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
    updated_at: datetime

    # incident
    # store_sections
    # employees

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
