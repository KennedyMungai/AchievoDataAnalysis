"""The incidents router file"""
from typing import List

from database.db import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas.incident_schema import (CreateIncident, ReadIncident,
                                     UpdateIncident)
from services.incident_services import (
    create_incident_service, delete_incident_service,
    retrieve_all_incident_in_a_store_section_service,
    retrieve_all_incident_in_a_store_service,
    retrieve_all_incidents_by_an_employee_service,
    retrieve_all_incidents_in_a_region_service, retrieve_all_incidents_service,
    retrieve_one_incident_service, retrieve_the_value_of_incidents_by_store_section_service,
    retrieve_the_top_twenty_most_valuable_incidents_in_a_region_service,
    retrieve_the_top_twenty_most_valuable_incidents_in_a_store_section_service,
    retrieve_the_top_twenty_most_valuable_incidents_in_a_store_service,
    retrieve_the_number_of_incidents_in_a_store_service,
    retrieve_the_value_of_incidents_in_a_store_service,
    retrieve_the_average_value_of_incidents_in_a_store_service,
    retrieve_the_most_notorious_store_section_service,
    retrieve_the_number_of_incidents_in_a_region_service,
    update_incident_service)
from sqlalchemy.orm import Session
from utils.oauth2 import get_current_user

incidents_router = APIRouter(prefix="/incidents", tags=["Incidents"])


@incidents_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_incident_endpoint(
    _incident_data: CreateIncident,
    _db: Session = Depends(get_db),
    # _current_user=Depends(get_current_user)
):
    """The endpoint to create an incident

    Args:
        _incident_data (CreateIncident): The data used to create an incident
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised when the create endpoint fails

    Returns:
        ReadIncident: The created incident
    """
    try:
        return await create_incident_service(_incident_data, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/")
async def retrieve_all_incidents_endpoint(
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve all incidents

    Args:
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised when the retrieve endpoint fails

    Returns:
        List[ReadIncident]: A list of incidents
    """
    try:
        return await retrieve_all_incidents_service(_db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/{_incident_id}")
async def retrieve_one_incident_endpoint(
    _incident_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve one incident

    Args:
        _incident_id (int): The id of the incident
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised when the retrieve endpoint fails

    Returns:
        ReadIncident: The incident
    """
    try:
        return await retrieve_one_incident_service(_incident_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=str(exc)) from exc


@incidents_router.put("/{_incident_id}", status_code=status.HTTP_202_ACCEPTED)
async def update_incident_endpoint(
    _incident_id: int,
    _incident_data: UpdateIncident,
    _db: Session = Depends(get_db)
):
    """The endpoint to update an incident data

    Args:
        _incident_id (int): The id of the incident
        _incident_data (UpdateIncident): The data used to update the incident
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised when the update endpoint fails

    Returns:
        ReadIncident: The updated incident
    """
    try:
        return await update_incident_service(_incident_id, _incident_data, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.delete("/{_incident_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_incident_endpoint(
    _incident_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to delete incidents

    Args:
        _incident_id (int): The id for an incident
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised incase anything goes wrong

    Returns:
        None: Nothing
    """
    try:
        return await delete_incident_service(_incident_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/store_section/{_store_section_id}")
async def retrieve_all_store_sections_incidents_router(
    _store_section_id: int,
    _db: Session = Depends(get_db)
) -> List[ReadIncident]:
    """The endpoint to retrieve all incidents in a store section


    Args:
        _store_section_id (int): The store section id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised incase of any issues

    Returns:
        List[ReadIncident]: A list of the incidents
    """
    try:
        return await retrieve_all_incident_in_a_store_section_service(_store_section_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)) from exc


@incidents_router.get("/store/{_store_id}")
async def retrieve_all_store_incidents_router(
    _store_id: int,
    _db: Session = Depends(get_db)
) -> List[ReadIncident]:
    """The endpoint to retrieve all incidents in a store


    Args:
        _store_id (int): The store id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised incase of any issues

    Returns:
        List[ReadIncident]: A list of the incidents
    """
    try:
        return await retrieve_all_incident_in_a_store_service(_store_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)) from exc


@incidents_router.get("/employee/{_employee_id}")
async def retrieve_all_employee_incidents_router(
    _employee_id: int,
    _db: Session = Depends(get_db)
) -> List[ReadIncident]:
    """The endpoint to retrieve all incidents in an employee


    Args:
        _employee_id (int): The employee id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised incase of any issues

    Returns:
        List[ReadIncident]: A list of the incidents
    """
    try:
        return await retrieve_all_incidents_by_an_employee_service(_employee_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/region/{_region_id}")
async def retrieve_all_region_incidents_router(
    _region_id: int,
    _db: Session = Depends(get_db)
) -> List[ReadIncident]:
    """The endpoint to retrieve all of a region's incidents

    Args:
        _region_id (int): The region id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised if anything goes wrong

    Returns:
        List[ReadIncident]: A list of the incidents retrieved
    """
    try:
        return await retrieve_all_incidents_in_a_region_service(_region_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/store_section/top_twenty/{_store_section_id}")
async def retrieve_the_top_twenty_most_valuable_incidents_in_a_store_section_router(
    _store_section_id: int,
    _db: Session = Depends(get_db)
) -> List[ReadIncident]:
    """The endpoint to retrieve the top twenty most valuable incidents in a store section

    Args:
        _store_section_id (int): The store section id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised if anything goes wrong

    Returns:
        List[ReadIncident]: A list of the top twenty most valuable incidents
    """
    try:
        return await retrieve_the_top_twenty_most_valuable_incidents_in_a_store_section_service(_store_section_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/store/top_twenty/{_store_id}")
async def retrieve_the_top_twenty_most_valuable_incidents_in_a_store_router(
    _store_id: int,
    _db: Session = Depends(get_db)
) -> List[ReadIncident]:
    """The endpoint to retrieve the top twenty most valuable incidents in a store

    Args:
        _store_id (int): The store id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised if anything goes wrong

    Returns:
        List[ReadIncident]: A list of the top twenty most valuable incidents
    """
    try:
        return await retrieve_the_top_twenty_most_valuable_incidents_in_a_store_service(_store_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/region/top_twenty/{_region_id}")
async def retrieve_the_top_twenty_most_valuable_incidents_in_a_region_router(
    _region_id: int,
    _db: Session = Depends(get_db)
) -> List[ReadIncident]:
    """The endpoint to retrieve the top twenty most valuable incidents in a region

    Args:
        _region_id (int): The region id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised if anything goes wrong

    Returns:
        List[ReadIncident]: A list of the top twenty most valuable incidents
    """
    try:
        return await retrieve_the_top_twenty_most_valuable_incidents_in_a_region_service(_region_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/store/count/{_store_id}")
async def retrieve_the_number_of_incidents_by_store_router(
    _store_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve the count of incidents in a single store

    Args:
        _store_id (int): The store id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if the fetch operation is unsuccessful

    Returns:
        int: The count
    """
    try:
        return await retrieve_the_number_of_incidents_in_a_store_service(_store_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/store/value/{_store_id}")
async def retrieve_the_total_value_of_incidents_in_a_store_router(
    _store_id: int,
):
    """The endpoint to retrieve the total value of incidents in a single store

    Args:
        _store_id (int): The store id

    Raises:
        HTTPException: A 400 is raised if the fetch operation is unsuccessful

    Returns:
        float: The value
    """
    try:
        return await retrieve_the_value_of_incidents_in_a_store_service(_store_id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/store/value/store_sections/{_store_id}")
async def retrieve_the_value_of_incidents_in_a_store_by_the_store_section_router(
    _store_id: int,
):
    """The route to retrieve a dictionary of the number of incidents by the store service

    Args:
        _store_id (int): The store id

    Raises:
        HTTPException: A 400 is raised if any issue is raised

    Returns:
        dict: A dictionary of store_sections_with_their_counts
    """
    try:
        return await retrieve_the_value_of_incidents_by_store_section_service(_store_id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/store/average/{_store_id}")
async def retrieve_the_average_value_of_incidents_in_a_store_router(
    _store_id: int,
):
    """The endpoint to retrieve the average value of incidents

    Args:
        _store_id (int): The id of the store

    Raises:
        HTTPException: A 400 is raised when there is an issue with the endpoint

    Returns:
        dict: A dict
    """
    try:
        return await retrieve_the_average_value_of_incidents_in_a_store_service(_store_id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/store/max/store_sections/{_store_id}")
async def retrieve_the_most_notorious_store_section_router(
    _store_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve the most notorious store section

    Args:
        _store_id (int): The id of the store
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised when there is an issue with the endpoint

    Returns:
        dict: A dict
    """
    try:
        return await retrieve_the_most_notorious_store_section_service(_store_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/region/count/{_region_id}")
async def retrieve_the_number_of_incidents_in_a_region_router(
    _region_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve the number of incidents in a given region

    Args:
        _region_id (int): The id of a region
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised incase anything goes wrong

    Returns:
        dict: Some dict
    """
    try:
        return await retrieve_the_number_of_incidents_in_a_region_service(_region_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
