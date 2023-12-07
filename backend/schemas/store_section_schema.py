"""The schema file for the store sections"""
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel
from schemas.incident_schema import ReadIncident


class StoreSectionBase(BaseModel):
    """The base schema for the store sections

    Args:
        BaseModel (Pydantic): The base class for the schemas
    """
    store_section_name: str
    store_id: int


class CreateStoreSection(StoreSectionBase):
    """The schema used to create store sections in the database

    Args:
        StoreSectionBase (Pydantic): The base schema for the store section data
    """
    pass


class ReadStoreSection(StoreSectionBase):
    """The schema used to read the store section data from the database

    Args:
        StoreSectionBase (Pydantic): The base schema for all store sections
    """
    store_section_id: int
    created_at: datetime
    updated_at: datetime

    incidents: List[ReadIncident]

    class Config:
        """The config class for reading data from the database
        """
        from_attributes = True


class UpdateStoreSection(BaseModel):
    """The schema used to update the store section data in the database

    Args:
        BaseModel (Pydantic): The schema used to update data
    """
    store_section_name: Optional[str]
    store_id: Optional[int]

    class Config:
        """The config class for reading data from the database
        """
        from_attributes = True
