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
    retrieve_one_incident_service,
    retrieve_the_average_value_of_incidents_per_region_service,
    retrieve_the_average_value_of_incidents_per_store_section_service,
    retrieve_the_average_value_of_incidents_per_store_service,
    retrieve_the_number_of_incidents_in_a_given_region_service,
    retrieve_the_number_of_incidents_in_a_given_store_section_service,
    retrieve_the_number_of_incidents_in_a_given_store_service,
    retrieve_the_number_of_incidents_per_employee_service,
    retrieve_the_top_twenty_most_valuable_incidents_in_a_region_service,
    retrieve_the_top_twenty_most_valuable_incidents_in_a_store_section_service,
    retrieve_the_top_twenty_most_valuable_incidents_in_a_store_service,
    retrieve_the_total_value_of_incidents_per_region_service,
    retrieve_the_total_value_of_incidents_per_store_section_service,
    retrieve_the_total_value_of_incidents_per_store_service,
    update_incident_service,
    retrieve_the_average_value_of_all_incidents_service,
    retrieve_the_total_number_of_incidents_service,
    retrieve_the_total_value_of_all_incidents_service
)
from sqlalchemy.orm import Session
from utils.oauth2 import get_current_user

incidents_router = APIRouter(prefix="/incidents", tags=["Incidents"])


@incidents_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_incident_endpoint(
    _incident_data: CreateIncident,
    _db: Session = Depends(get_db),
    _current_user=Depends(get_current_user)
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


@incidents_router.get("/store_section/total/{_store_section_id}")
async def retrieve_the_total_value_of_all_incidents_in_a_store_section_router(
    _store_section_id: int,
    _db: Session = Depends(get_db)
) -> float:
    """The router to retrieve the total value of all incidents in a store section

    Args:
        _store_section_id (int): The store section id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised if anything goes wrong

    Returns:
        float: The total value of all incidents in a store section
    """
    try:
        return await retrieve_the_total_value_of_incidents_per_store_section_service(_store_section_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/store/total/{_store_id}")
async def retrieve_the_total_value_of_all_incidents_in_a_store_router(
    _store_id: int,
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the total value of all incidents in a store

    Args:
        _store_id (int): The store id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 404 is raised if anything goes wrong

    Returns:
        float: The total value of all incidents in a store
    """
    try:
        return await retrieve_the_total_value_of_incidents_per_store_service(_store_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/region/total/{_region_id}")
async def retrieve_the_total_value_of_all_incidents_in_a_region_router(
    _region_id: int,
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the total value of incidents in a region

    Args:
        _region_id (int): The region id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        float: The total value of incidents
    """
    try:
        return await retrieve_the_total_value_of_incidents_per_region_service(_region_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/store_section/average/{_store_section_id}")
async def retrieve_the_average_value_of_all_incidents_in_a_store_section_router(
    _store_section_id: int,
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the average value of all incidents in a store section

    Args:
        _store_section_id (int): The store section id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        float: The average value of all incidents in a store section
    """
    try:
        return await retrieve_the_average_value_of_incidents_per_store_section_service(_store_section_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/store/average/{_store_id}")
async def retrieve_the_average_value_of_all_incidents_in_a_store_router(
    _store_id: int,
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the average value of all incidents in a store

    Args:
        _store_id (int): The store id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        float: The average value of all incidents in a store
    """
    try:
        return await retrieve_the_average_value_of_incidents_per_store_service(_store_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/region/average/{_region_id}")
async def retrieve_the_average_value_of_all_incidents_in_a_region_router(
    _region_id: int,
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the average value of all incidents in a region

    Args:
        _region_id (int): The region id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        float: The average value of all incidents in a region
    """
    try:
        return await retrieve_the_average_value_of_incidents_per_region_service(_region_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("store_section/count/{_store_section_id}")
async def retrieve_the_number_of_incidents_in_a_store_section_router(
    _store_section_id: int,
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the number of incidents in a store section

    Args:
        _store_section_id (int): The store section id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        float: The number of incidents in a store section
    """
    try:
        return await retrieve_the_number_of_incidents_in_a_given_store_section_service(_store_section_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/store/count/{_store_id}")
async def retrieve_the_number_of_incidents_in_a_store_router(
    _store_id: int,
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the number of incidents in a store

    Args:
        _store_id (int): The store id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        float: The number of incidents in a store
    """
    try:
        return await retrieve_the_number_of_incidents_in_a_given_store_service(_store_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("/region/count/{_region_id}")
async def retrieve_the_number_of_incidents_in_a_region_router(
    _region_id: int,
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the number of incidents in a region

    Args:
        _region_id (int): The region id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        float: The number of incidents in a region
    """
    try:
        return await retrieve_the_number_of_incidents_in_a_given_region_service(_region_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("employee/count/{_employee_id}")
async def retrieve_the_number_of_incidents_per_employee_router(
    _employee_id: int,
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the number of incidents per employee

    Args:
        _employee_id (int): The employee id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        float: The number of incidents per employee
    """
    try:
        return await retrieve_the_number_of_incidents_per_employee_service(_employee_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("all/count")
async def retrieve_the_total_number_of_incidents_router(
    _db: Session = Depends(get_db)
) -> int:
    """The endpoint to retrieve the total number of incidents in the database. This is used to calculate the percentage of incidents that are resolved. It is also used to calculate the average value of all incidents. This is also used to calculate the average number of incidents per employee. This is also used to calculate the average number of incidents in a store. This is also used to calculate the average number of incidents in a region. This is also used to calculate the average number of incidents in a store section. This is also used to calculate the number of incidents in a store section. This is also used to calculate the number of incidents in a store. This is also used to calculate the number of incidents in a region. This is also used to calculate the number of incidents per employee. This is also used to calculate the total value of all incidents in a store. This is also used to calculate the total value of all incidents in a region. This is also used to calculate the total value of all incidents in a store section. This is also used to calculate the total value of all incidents in a region. This is also used to calculate the total value of all incidents in a store section. This is also used to calculate the total value of all incidents in a region. This is also

    Args:
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised incase of any exception

    Returns:
        int: The number of incidents
    """
    try:
        return await retrieve_the_total_number_of_incidents_service(_db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("all/average")
async def retrieve_the_average_value_of_all_incidents_router(
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the average value of all incidents in the database

    Args:
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        float: The average value of all incidents
    """
    try:
        return await retrieve_the_average_value_of_all_incidents_service(_db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@incidents_router.get("all/total")
async def retrieve_the_total_value_of_all_incidents_router(
    _db: Session = Depends(get_db)
) -> float:
    """The endpoint to retrieve the total value of all incidents in the database

    Args:
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        float: The total value of all incidents
    """
    try:
        return await retrieve_the_total_value_of_all_incidents_service(_db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
