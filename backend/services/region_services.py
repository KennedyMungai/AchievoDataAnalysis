"""The services file for the region CRUD operations"""
from typing import List

from models.models import Regions
from schemas.region_schema import CreateRegion, ReadRegion, UpdateRegion
from sqlalchemy.orm import Session


async def create_region_service(_region_data: CreateRegion, _db: Session) -> ReadRegion:
    """The service function to add a region to the database

    Args:
        _region_data (CreateRegion): The data needed to create a new region
        _db (Session): The database session

    Returns:
        ReadRegion: The newly created region object
    """
    region = Regions(**_region_data.model_dump())
    _db.add(region)
    _db.commit()
    _db.refresh(region)
    return region


async def retrieve_all_regions_service(_db: Session) -> List[ReadRegion]:
    """The service function to retrieve all regions from the database

    Args:
        _db (Session): The database session

    Returns:
        List[ReadRegion]: The list of regions
    """
    return _db.query(Regions).all()


async def retrieve_one_region_service(_region_id: int, _db: Session) -> ReadRegion:
    """The service function to retrieve a region from the database

    Args:
        _region_id (int): The id of the region
        _db (Session): The database session

    Returns:
        ReadRegion: The region object
    """
    return _db.query(Regions).filter(Regions.region_id == _region_id).first()


async def update_region_service(
    _region_id: int,
    _update_region_data: UpdateRegion,
    _db: Session
) -> ReadRegion:
    """The service function to update a region in the database

    Args:
        _region_id (int): The id of the region
        _update_region_data (UpdateRegion): The data needed to update the region
        _db (Session): The database session

    Returns:
        ReadRegion: The updated region object
    """
    region = await retrieve_one_region_service(_region_id, _db)
    
    if not region:
        return None
    
    region.region_name = _update_region_data.region_name
    
    _db.commit()
    _db.refresh(region)
    return region


async def delete_region_service(_region_id: int, _db: Session) -> None:
    """The service function to delete a region from the database

    Args:
        _region_id (int): The id of the region
        _db (Session): The database session

    Returns:
        ReadRegion: The deleted region object
    """
    region = await retrieve_one_region_service(_region_id, _db)
    if not region:
        return None
    _db.delete(region)
    _db.commit()
