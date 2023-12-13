"""The router file foe the store sections"""
from database.db import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas.store_section_schema import CreateStoreSection, UpdateStoreSection
from services.store_section_services import (
    create_store_section_service, delete_store_section_service,
    retrieve_all_store_sections_in_store, retrieve_one_store_section,
    update_store_section_service)
from sqlalchemy.orm import Session

store_sections_router = APIRouter(
    prefix="/store-sections", tags=["Store Sections"])


@store_sections_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_store_section_endpoint(
    _store_section_data: CreateStoreSection,
    _db: Session = Depends(get_db)
):
    """The endpoint to create a store section

    Args:
        _store_section_data (CreateStoreSection): The data used to create store sections
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if the endpoint does not create a store section

    Returns:
        ReadStoreSection: The newly created store section
    """
    try:
        return await create_store_section_service(_store_section_data, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@store_sections_router.get("/{_store_id}")
async def retrieve_all_store_sections_endpoint(
    _store_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve all store sections in a store

    Args:
        _store_id (int): The id of the store
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised if a store is not found

    Returns:
        List[ReadStoreSection]: The store sections
    """
    try:
        return await retrieve_all_store_sections_in_store(_store_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@store_sections_router.get("/{_store_section_id}")
async def retrieve_one_store_section_endpoint(
    _store_section_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to create a store section

    Args:
        _store_section_id (int): The id of a store section
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised if a store section is not found

    Returns:
        ReadStoreSection: The retrieved store section
    """
    try:
        return await retrieve_one_store_section(_store_section_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@store_sections_router.put(
    "/{_store_section_id}",
    status_code=status.HTTP_202_ACCEPTED
)
async def update_store_section_endpoint(
    _store_section_id: int,
    _store_section_data: UpdateStoreSection,
    _db: Session = Depends(get_db)
):
    """The endpoint to update a store section

    Args:
        _store_section_id (int): Store section id
        _store_section_data (UpdateStoreSection): The data used to update store sections
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if something goes wrong  

    Returns:
        ReadStoreSection: The updated store section
    """
    try:
        return await update_store_section_service(_store_section_id, _store_section_data, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@store_sections_router.delete("/{_store_section_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_store_section_endpoint(
    _store_section_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to delete a store section

    Args:
        _store_section_id (int): The id of a store section
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised if a store section is not found
    """
    try:
        return await delete_store_section_service(_store_section_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc
