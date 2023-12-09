"""The region's schema file"""
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel
from schemas.employee_schema import ReadEmployee
from schemas.incident_schema import ReadIncident
from schemas.store_schema import ReadStore


class RegionBase(BaseModel):
    """The base schema for the region data

    Args:
        BaseModel (Pydantic): The base class for the regions data
    """
    region_name: str


class CreateRegion(RegionBase):
    """The schema used to create regions

    Args:
        RegionBase (Pydantic): The basis for the schema
    """


class ReadRegion(RegionBase):
    """The schema used to read regions

    Args:
        RegionBase (Pydantic): The basis for the schema
    """
    region_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    incidents: List[ReadIncident]
    employees: List[ReadEmployee]
    stores: List[ReadStore]

    class Config:
        """Config subclass for reading database data
        """
        from_attributes = True


class UpdateRegion(BaseModel):
    """The schema used to update regions

    Args:
        BaseModel (Pydantic): The base class for the regions data
    """
    region_name: Optional[str] = None

    class Config:
        """The config subclass for reading data from the database
        """
        from_attributes = True
