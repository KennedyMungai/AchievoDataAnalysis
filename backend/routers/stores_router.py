"""The routers file for the stores data"""
from database.db import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas.store_schema import CreateStore, UpdateStore
from services.store_services import (create_store_service,
                                     delete_store_service,
                                     retrieve_all_stores_in_a_region_service,
                                     retrieve_one_store_service,
                                     update_store_service)
from sqlalchemy.orm import Session

stores_router = APIRouter(prefix="/stores", tags=["Stores"])


@stores_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_store_endpoint(
    _store_data: CreateStore,
    _db: Session = Depends(get_db)
):
    """The endpoint to create stores

    Args:
        _store_data (CreateStore): The data used to create stores
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: _description_

    Returns:
        ReadStore: _description_
    """
    # try:
    return await create_store_service(_store_data, _db)
    # except Exception as exc:
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@stores_router.get("/{_region_id}")
async def retrieve_all_stores_endpoint(
    _region_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve all stores in a region

    Args:
        _region_id (int): The id of a region
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: _description_

    Returns:
        List[ReadStore]: _description_
    """
    try:
        return await retrieve_all_stores_in_a_region_service(_region_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@stores_router.get("/{_store_id}")
async def retrieve_one_store_endpoint(
    _store_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve one store

    Args:
        _store_id (int): The id of a store
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised if a store is not found

    Returns:
        ReadStore: The store
    """
    try:
        return await retrieve_one_store_service(_store_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@stores_router.put("/{_store_id}", status_code=status.HTTP_202_ACCEPTED)
async def update_store_endpoint(
    _store_id: int,
    _store_data: UpdateStore,
    _db: Session = Depends(get_db)
):
    """The endpoint to update store data

    Args:
        _store_id (int): The id of the store
        _store_data (UpdateStore): The data used to update the store
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if the update fails

    Returns:
        ReadStore: The data of the newly updated store
    """
    try:
        return await update_store_service(_store_id, _store_data, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@stores_router.delete("/{_store_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_store_endpoint(
    _store_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to delete a store

    Args:
        _store_id (int): The id of the store
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if the store fails to delete the data

    Returns:
        None: Nothing
    """
    try:
        return await delete_store_service(_store_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
