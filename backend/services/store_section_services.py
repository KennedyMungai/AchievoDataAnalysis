"""The store section services CRUD file"""
from typing import List
from sqlalchemy.orm import Session
from schemas.store_section_schema import CreateStoreSection, UpdateStoreSection, ReadStoreSection
from models.models import StoreSections


async def create_store_section_service(
    _store_section_data: CreateStoreSection, _db: Session
) -> ReadStoreSection:
    """The service function to create store sections

    Args:
        _store_section_data (CreateStoreSection): The data used to create store sections
        _db (Session): The database session

    Returns:
        ReadStoreSection: The newly created store section
    """
    new_store_section = StoreSections(**_store_section_data.model_dump())
    _db.add(new_store_section)
    _db.commit()
    _db.refresh(new_store_section)


async def retrieve_all_store_sections_in_store(_store_id: int, _db: Session) -> List[ReadStoreSection]:
    """The service function to retrieve all store sections in a store

    Args:
        _store_id (int): The id of the store
        _db (Session): The database session

    Returns:
        List[ReadStoreSection]: A list of all the store sections
    """
    return _db.query(StoreSections).filter(StoreSections.store_id == _store_id).all()


async def retrieve_one_store_section(_store_section_id: int, _db: Session) -> ReadStoreSection:
    """The service function to retrieve one store section

    Args:
        _store_section_id (int): The id of the store section
        _db (Session): The database session

    Returns:
        ReadStoreSection: The retrieved store section
    """
    return _db.query(StoreSections).filter(StoreSections.store_section_id == _store_section_id).first()


async def update_store_section_service(
        _store_section_id: int, _update_store_section_data: UpdateStoreSection, _db: Session) -> ReadStoreSection:
    """The service function to update a store section

    Args:
        _store_section_id (int): The id of the store section
        _update_store_section_data (UpdateStoreSection): The data needed to update the store section
        _db (Session): The database session

    Returns:
        ReadStoreSection: The updated store section
    """
    store_section_to_update = retrieve_one_store_section(
        _store_section_id, _db)

    if _update_store_section_data.store_section_name:
        store_section_to_update.store_section_name = _update_store_section_data.store_section_name
    if _update_store_section_data.store_section_address:
        store_section_to_update.store_id = _update_store_section_data.store_id

    _db.commit()
    _db.refresh(store_section_to_update)

    return store_section_to_update


async def delete_store_section_service(_store_section_id: int, _db: Session) -> None:
    """The service function to delete a store section

    Args:
        _store_section_id (int): The id of the store section
        _db (Session): The database session
    """
    store_section_to_delete = retrieve_one_store_section(
        _store_section_id, _db)
    if not store_section_to_delete:
        return None
    _db.delete(store_section_to_delete)
    _db.commit()

    return None
