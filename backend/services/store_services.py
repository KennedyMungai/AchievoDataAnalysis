"""The service file for Store data CRUD operations"""
from typing import List

from schemas.store_schema import CreateStore, ReadStore, UpdateStore
from models.models import Stores
from sqlalchemy.orm import Session


async def create_store_service(_store: CreateStore, _db: Session) -> ReadStore:
    """The service function to create stores

    Args:
        _store (CreateStore): The data used to create a store
        _db (Session): The database session

    Returns:
        ReadStore: The newly created store
    """
    db_store = Stores(**_store.model_dump())

    _db.add(db_store)
    _db.commit()
    _db.refresh(db_store)

    return db_store


async def retrieve_all_stores_in_a_region_service(_region_id: int, _db: Session) -> List[ReadStore]:
    """The service to retrieve all stores from the database

    Args:
        _db (Session): The database session

    Returns:
        List[ReadStore]: A list of stores from the database
    """
    return _db.query(Stores).where(Stores.region_id == _region_id).all()


async def retrieve_one_store_service(
    _store_id: int, _db: Session
) -> ReadStore:
    """The service function to retrieve a single store from the database

    Args:
        _store_id (int): The store id
        _db (Session): The database session

    Returns:
        ReadStore: The data retrieved from the database
    """
    return _db.query(Stores).filter(Stores.store_id == _store_id).first()


async def update_store_service(
    _store_id: int, _update_store_data: UpdateStore, _db: Session
) -> ReadStore:
    """The service function to update a store in the database

    Args:
        _store_id (int): The id of the store
        _update_store_data (UpdateStore): The data needed to update the store
        _db (Session): The database session

    Returns:
        ReadStore: The updated store object
    """
    store = await retrieve_one_store_service(_store_id, _db)

    if not store:
        return None

    if _update_store_data.store_name:
        store.store_name = _update_store_data.store_name
    if _update_store_data.store_address:
        store.store_address = _update_store_data.store_address

    _db.commit()
    _db.refresh(store)

    return store


async def delete_store_service(_store_id: int, _db: Session) -> None:
    """The service function to delete a store from the database

    Args:
        _store_id (int): The id of the store
        _db (Session): The database session
    """
    store = await retrieve_one_store_service(_store_id, _db)

    if not store:
        return None

    _db.delete(store)
    _db.commit()
