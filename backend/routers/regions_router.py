"""The router file for the regions"""
from typing import List
from sqlalchemy.orm import Session
from database.db import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas.region_schema import CreateRegion, ReadRegion, UpdateRegion
from services.region_services import (create_region_service,
                                      delete_region_service,
                                      retrieve_all_regions_service,
                                      retrieve_one_region_service,
                                      update_region_service)


regions_router = APIRouter(prefix="/regions", tags=["Regions"])


@regions_router.get("/")
async def retrieve_all_regions_endpoint(
    _db: Session = Depends(get_db)
) -> List[ReadRegion]:
    """The endpoint to retrieve all regions

    Args:
        _db (SessionLocal, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised when no regions are found    

    Returns:
        List[ReadRegion]: A list of all regions
    """
    try:
        return retrieve_all_regions_service(_db)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Failed to retrieve all regions") from exc


@regions_router.get("/{region_id}")
async def retrieve_one_region_endpoint(
    _region_id: int,
    _db: Session = Depends(get_db)
) -> ReadRegion:
    """The endpoint to retrieve one region

    Args:
        _region_id (int): The id of the region
        _db (SessionLocal, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised when the region is not found    

    Returns:
        ReadRegion: The region
    """
    try:
        return retrieve_one_region_service(_region_id, _db)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'The region with id {_region_id} not found') from exc


@regions_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_region_endpoint(
    _region_data: CreateRegion,
    _db: Session = Depends(get_db)
) -> ReadRegion:
    """The endpoint to create a region

    Args:
        _region_data (CreateRegion): The data of the region
        _db (SessionLocal, optional): The database session. Defaults to Depends(get_db).

    Returns:
        ReadRegion: The created region
    """
    try:
        return create_region_service(_region_data, _db)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Failed to create region") from exc


@regions_router.put("/{region_id}", status_code=status.HTTP_202_ACCEPTED)
async def update_region_endpoint(
    _region_id: int,
    _region_data: UpdateRegion,
    _db: Session = Depends(get_db)
) -> ReadRegion:
    """The endpoint to update a region

    Args:
        _region_id (int): The id of the region
        _region_data (UpdateRegion): The data of the region
        _db (SessionLocal, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised when the region is not found    

    Returns:
        ReadRegion: The updated region
    """
    try:
        return update_region_service(_region_id, _region_data, _db)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Something went wrong') from exc


@regions_router.delete("/{region_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_region_endpoint(_region_id: int, _db: Session = Depends(get_db)) -> None:
    """The endpoint to delete a region

    Args:
        _region_id (int): The id of the region
        _db (SessionLocal, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised when the region is not found    
    """
    try:
        return delete_region_service(_region_id, _db)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail='Something went wrong') from exc
