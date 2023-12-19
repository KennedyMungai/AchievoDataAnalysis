"""The service file fir Incident CRUD operations"""
from typing import List

import pandas as pd
from services.store_section_services import retrieve_one_store_section
from models.models import Incidents
from schemas.incident_schema import (CreateIncident, ReadIncident,
                                     UpdateIncident)
from sqlalchemy.orm import Session
from database.db import engine as conn


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


async def retrieve_the_top_twenty_most_valuable_incidents_in_a_store_section_service(
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
    return _db.query(Incidents).filter(
        Incidents.store_section_id == _store_section_id
    ).order_by(
        Incidents.total_value.desc()
    ).limit(20).all()


async def retrieve_the_top_twenty_most_valuable_incidents_in_a_store_service(
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
    return _db.query(Incidents).filter(
        Incidents.store_id == _store_id
    ).order_by(
        Incidents.total_value.desc()
    ).limit(20).all()


async def retrieve_the_top_twenty_most_valuable_incidents_in_a_region_service(
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
    return _db.query(Incidents).filter(
        Incidents.region_id == _region_id
    ).order_by(
        Incidents.total_value.desc()
    ).limit(20).all()


async def retrieve_the_number_of_incidents_in_a_store_service(
    _store_id: int,
    _db: Session
):
    """The service function to retrieve the number of incidents in a store

    Args:
        _store_id (int): The id of the store
        _db (Session): The database session

    Returns:
        int: The number of incidents
    """
    count = _db.query(Incidents).filter(
        Incidents.store_id == _store_id).count()

    return {"count": count}


async def retrieve_the_value_of_incidents_in_a_store_service(
    _store_id: int,
):
    """The service function to retrieve the value of incidents in a store

    Args:
        _store_id (int): The id of the store

    Returns:
        Dict: A dictionary of the total value of incidents
    """
    query = f'SELECT * FROM incidents where store_id = {_store_id}'
    df = pd.read_sql(query, conn)
    filtered_df = df.groupby('store_id')['total_value'].sum()
    some_df = filtered_df.to_dict()
    some_variable = list(some_df.values())[0]
    return {"total_values": some_variable}


async def retrieve_the_value_of_incidents_by_store_section_service(
    _store_id: int,
):
    """The service function to group the number of incidents in store sections by the number of incidents

    Args:
        _store_id (int): The store Id

    Returns:
        Dict: A dictionary of the count of incidents
    """
    # TODO: Implement the sorting logic

    return {'some jokes': 'lol'}


async def retrieve_the_average_value_of_incidents_in_a_store_service(
    _store_id: int
):
    """The service function to retrieve the average value of incidents in a store section by store section id.

    Args:
        _store_section_id (int): The store section id

    Returns:
        Dict: A dictionary of the average value of incidents
    """
    query = f'SELECT * FROM incidents where store_id = {_store_id}'
    df = pd.read_sql(query, conn)
    filtered_df = df.groupby('store_id')['total_value'].mean()
    some_df = filtered_df.to_dict()
    some_variable = list(some_df.values())[0]
    return {"average_value": some_variable}


async def retrieve_the_most_notorious_store_section_service(
    _store_id: int,
    _db: Session
):
    """The service function to retrieve the most notorious store section

    Args:
        _store_id (int): The d of the store
        _db (Session): The database session

    Returns:
        Dict: A dictionary of the most notorious store section
    """
    query = f"SELECT * FROM incidents WHERE store_id = {_store_id}"
    df = pd.read_sql(query, conn)
    filtered_df = df.groupby('store_section_id')['total_value'].sum()
    some_dict = filtered_df.to_dict()
    max_value = max(some_dict.values())

    store_section = await retrieve_one_store_section(max(some_dict.keys()), _db)

    store_section_data = {}

    store_section_data["store_section_name"] = store_section.store_section_name
    store_section_data["max_value"] = max_value

    return store_section_data
