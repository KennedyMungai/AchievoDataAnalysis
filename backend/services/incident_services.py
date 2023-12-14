"""The service file fir Incident CRUD operations"""
from typing import List

from models.models import Incidents
from schemas.employee_schema import ReadEmployee
from schemas.incident_schema import (CreateIncident, ReadIncident,
                                     UpdateIncident)
from sqlalchemy.orm import Session


async def create_incident_service(
    _incident_data: CreateIncident,
    _db: Session
) -> ReadIncident:
    """The service function to create new incidents

    Args:
        _incident_data (CreateIncident): The data used to create incidents

        _db (Session): The database session

    Returns:
        ReadIncident: The newly created incident
    """
    new_incident = Incidents(**_incident_data.model_dump())

    _db.add(new_incident)
    _db.commit()
    _db.refresh(new_incident)

    return new_incident


async def retrieve_all_incidents_service(_db: Session) -> List[ReadIncident]:
    """The service function to retrieve all incidents from the database

    Args:
        _db (Session): The database session

    Returns:
        List[ReadIncident]: The list of incidents
    """
    return _db.query(Incidents).all()


async def retrieve_one_incident_service(
        _incident_id: int, _db: Session) -> ReadIncident:
    """The service function to retrieve one incident

    Args:
        _incident_id (int): The id of the incident
        _db (Session): The database session

    Returns:
        ReadIncident: The retrieved incident object
    """
    return _db.query(Incidents).filter(Incidents.incident_id == _incident_id).first()


async def update_incident_service(
    _incident_id: int, _update_incident_data: UpdateIncident, _db: Session
) -> ReadIncident:
    """The service function to update a store incident

    Args:
        _incident_id (int): The id of an incident
        _update_incident_data (UpdateIncident): The data used to update the incident
        _db (Session): The database session

    Returns:
        ReadIncident: The updated incident
    """
    incident_to_update = await retrieve_one_incident_service(_incident_id, _db)

    if _update_incident_data.incident_description:
        incident_to_update.incident_description = _update_incident_data.incident_description
    if _update_incident_data.product_name:
        incident_to_update.product_name = _update_incident_data.product_name
    if _update_incident_data.product_code:
        incident_to_update.product_code = _update_incident_data.product_code
    if _update_incident_data.product_quantity:
        incident_to_update.product_quantity = _update_incident_data.product_quantity
    if _update_incident_data.product_price:
        incident_to_update.product_price = _update_incident_data.product_price
    if _update_incident_data.is_resolved:
        incident_to_update.is_resolved = _update_incident_data.is_resolved

    _db.commit()
    _db.refresh(incident_to_update)

    return incident_to_update


async def delete_incident_service(
    _incident_id: int, _db: Session
) -> None:
    """The service function to delete an incident from the database

    Args:
        _incident_id (int): The id of the incident
        _db (Session): The database session
    """
    incident_to_delete = await retrieve_one_incident_service(_incident_id, _db)
    if not incident_to_delete:
        return None
    _db.delete(incident_to_delete)
    _db.commit()
    return None


async def retrieve_all_incident_in_a_store_section_service(
    _store_section_id: int,
    _db: Session
) -> List[ReadIncident]:
    """The service function to retrieve all incidents in a store section

    Args:
        _store_section (int): The id of the store section
        _db (Session): The database session

    Returns:
        List[ReadIncident]: The list of incidents
    """
    return _db.query(Incidents).filter(Incidents.store_section_id == _store_section_id).all()


async def retrieve_all_incident_in_a_store_service(
    _store_id: int,
    _db: Session
) -> List[ReadIncident]:
    """The service function to retrieve all incidents in a store

    Args:
        _store_id (int): The id of the store
        _db (Session): The database session

    Returns:
        List[ReadIncident]: The list of incidents
    """
    return _db.query(Incidents).filter(Incidents.store_id == _store_id).all()


async def retrieve_all_incidents_in_a_region_service(
    _region_id: int,
    _db: Session
) -> List[ReadIncident]:
    """The service function to retrieve all incidents in a region

    Args:
        _region_id (int): The id of the region
        _db (Session): The database session

    Returns:
        List[ReadIncident]: The list of incidents
    """
    return _db.query(Incidents).filter(Incidents.region_id == _region_id).all()


async def retrieve_all_incidents_by_an_employee_service(
    _employee_id: int,
    _db: Session
) -> List[ReadIncident]:
    """The service function to retrieve all incidents by an employee

    Args:
        _employee_id (int): The id of the employee
        _db (Session): The database session

    Returns:
        List[ReadIncident]: The list of incidents
    """
    return _db.query(Incidents).filter(Incidents.employee_id == _employee_id).all()


async def retrieve_the_top_twenty_most_valuable_incidents_in_a_store_section(
    _store_section_id: int,
    _db: Session
) -> List[ReadIncident]:
    """The service function to retrieve the top twenty most variable incidents in a store section

    Args:
        _store_section_id (int): The id of the store section
        _db (Session): The database session

    Returns:
        List[ReadIncident]: The list of incidents
    """
    return _db.query(Incidents).filter(Incidents.store_section_id == _store_section_id).order_by(Incidents.product_price.desc()).limit(20).all()


async def retrieve_the_top_twenty_most_valuable_incidents_in_a_store(
    _store_id: int,
    _db: Session
) -> List[ReadIncident]:
    """The service function to retrieve the top twenty most valuable incidents in a store

    Args:
        _store_id (int): The id of the store
        _db (Session): The database session

    Returns:
        List[ReadIncident]: The list of incidents
    """
    return _db.query(Incidents).filter(Incidents.store_id == _store_id).order_by(Incidents.product_price.desc()).limit(20).all()


async def retrieve_the_top_twenty_most_valuable_incidents_in_a_region(
    _region_id: int,
    _db: Session
) -> List[ReadIncident]:
    """The service function to retrieve the top twenty most valuable incidents in a region

    Args:
        _region_id (int): The id of the region
        _db (Session): The database session

    Returns:
        List[ReadIncident]: The list of incidents
    """
    return _db.query(Incidents).filter(Incidents.region_id == _region_id).order_by(Incidents.product_price.desc()).limit(20).all()
