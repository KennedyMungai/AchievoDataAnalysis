"""The incidents router file"""
from typing import List

from database.db import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas.incident_schema import (CreateIncident, ReadIncident,
                                     UpdateIncident)
from services.incident_services import (
    create_incident_service, delete_incident_service,
    retrieve_a_regions_graphing_data_service,
    retrieve_a_store_sections_graphing_data_service,
    retrieve_all_incident_in_a_store_section_service,
    retrieve_all_incident_in_a_store_service,
    retrieve_all_incidents_by_an_employee_service,
    retrieve_all_incidents_in_a_region_service, retrieve_all_incidents_service,
    retrieve_an_employees_graphing_data_service, retrieve_one_incident_service,
    retrieve_the_graphing_data_of_incidents_by_store_section_service,
    retrieve_the_most_notorious_incident_in_a_store_section_service,
    retrieve_the_most_notorious_incident_reported_by_an_employee_service,
    retrieve_the_most_notorious_region_service,
    retrieve_the_most_notorious_store_section_service,
    retrieve_the_most_notorious_store_service,
    retrieve_the_number_of_all_incidents_submitted_by_an_employee_service,
    retrieve_the_number_of_incidents_in_a_region_service,
    retrieve_the_number_of_incidents_in_a_store_section_service,
    retrieve_the_number_of_incidents_in_a_store_service,
    retrieve_the_number_of_overall_incidents_service,
    retrieve_the_overall_graphing_data_service,
    retrieve_the_overall_top_twenty_most_valuable_incidents_service,
    retrieve_the_ten_most_valuable_incidents_reported_by_an_employee_service,
    retrieve_the_top_twenty_most_valuable_incidents_in_a_region_service,
    retrieve_the_top_twenty_most_valuable_incidents_in_a_store_section_service,
    retrieve_the_top_twenty_most_valuable_incidents_in_a_store_service,
    retrieve_the_value_of_all_incidents_in_a_region_service,
    retrieve_the_value_of_all_incidents_reported_by_an_employee_service,
    retrieve_the_value_of_incidents_in_a_store_section_service,
    retrieve_the_value_of_incidents_in_a_store_service,
    retrieve_the_value_of_overall_incidents_service, update_incident_service)
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
        return await retrieve_the_top_twenty_most_valuable_incidents_in_a_store_section_service(
            _store_section_id,
            _db
        )
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
        return await retrieve_the_top_twenty_most_valuable_incidents_in_a_store_service(
            _store_id,
            _db
        )
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
        return await retrieve_the_top_twenty_most_valuable_incidents_in_a_region_service(
            _region_id,
            _db
        )
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


@incidents_router.get("/store/value/graphing_data/{_store_id}")
async def retrieve_the_graphing_data_of_incidents_by_store_section_router(
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
        return await retrieve_the_graphing_data_of_incidents_by_store_section_service(_store_id)
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


@incidents_router.get("/region/value/{_region_id}")
async def retrieve_the_value_of_incidents_in_a_region_router(
    _region_id: int
):
    """The endpoint to retrieve the value of all incidents in a region

    Args:
        _region_id (int): The region id

    Raises:
        HTTPException: A 400 is raised if anything goes wrong. The exception is raised from the service.total value

    Returns:
        dict: Some Dict
    """
    try:
        return await retrieve_the_value_of_all_incidents_in_a_region_service(
            _region_id
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/region/max/store/{_region_id}")
async def retrieve_the_most_notorious_store_router(
    _region_id: int,
    _db: Session = Depends(get_db)
):
    """The router to get the most notorious store section

    Args:
        _region_id (int): The region id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        dict: max store region
    """
    try:
        return await retrieve_the_most_notorious_store_service(_region_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/overall/top_twenty")
async def retrieve_the_overall_top_twenty_most_valuable_incidents_router(
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve the overall top twenty most valuable incidents

    Args:
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised incase anything goes wrong

    Returns:
        List[dict]: A list of the most valuable incidents
    """
    try:
        return await retrieve_the_overall_top_twenty_most_valuable_incidents_service(_db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/overall/count")
async def retrieve_the_overall_number_of_incidents_router(
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve the overall number of incidents

    Args:
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised incase anything goes wrong

    Returns:
        int: The number of incidents
    """
    try:
        return await retrieve_the_number_of_overall_incidents_service(_db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/overall/value")
async def retrieve_the_overall_value_of_incidents_router():
    """The router to get the value of all the incidents

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        dict: A dict with the appropriate value
    """
    try:
        return await retrieve_the_value_of_overall_incidents_service()
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/overall/max/region")
async def retrieve_the_overall_most_notorious_region_router(
    _db: Session = Depends(get_db)
):
    """The endpoint to get the most notorious region

    Args:
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised incase of anything

    Returns:
        dict: A dict containing the most notorious region
    """
    try:
        return await retrieve_the_most_notorious_region_service(_db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/store_section/count/{_store_section_id}")
async def retrieve_the_number_of_incidents_in_a_store_section_router(
    _store_section_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to get the number of incidents in a single store section

    Args:
        _store_section_id (int): The store section id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised incase anything goes wrong

    Returns:
        dict: A dict containing the count
    """
    try:
        return await retrieve_the_number_of_incidents_in_a_store_section_service(
            _store_section_id,
            _db
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/store_section/value/{_store_section_id}")
async def retrieve_the_value_of_incidents_in_a_store_section_router(
    _store_section_id: int
):
    """The endpoint to get the value of all incidents inside a store section

    Args:
        _store_section_id (int): The id of a store section

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        dict: A dict containing the value of all the incidents
    """
    try:
        return await retrieve_the_value_of_incidents_in_a_store_section_service(_store_section_id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/store_section/max/store/{_store_section_id}")
async def retrieve_the_most_notorious_incident_in_a_store_section_router(
    _store_section_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to get the most notorious incident in a store section

    Args:
        _store_section_id (int): The store section id
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised if anything goes wrong

    Returns:
        dict: A dict containing the most notorious incident
    """
    try:
        return await retrieve_the_most_notorious_incident_in_a_store_section_service(
            _store_section_id,
            _db
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/employee/count/{_employee_id}")
async def retrieve_the_number_of_all_incidents_submitted_by_an_employee_router(
    _employee_id: int,
    _db: Session = Depends(get_db)
):
    """The service function to get the number of incidents submitted by an employee

    Args:
        _employee_id (int): The id of the employee
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised when there is an issue fetching the data

    Returns:
        count: The employee incidents count
    """
    try:
        return await retrieve_the_number_of_all_incidents_submitted_by_an_employee_service(
            _employee_id,
            _db
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/employee/value/{_employee_id}")
async def retrieve_the_value_of_all_incidents_reported_by_an_employee_router(
    _employee_id: int
):
    """The endpoint to get the value of all incidents reported by an employee

    Args:
        _employee_id (int): Employee Id

    Raises:
        HTTPException: A 400 is raised incase anything goes wrong

    Returns:
        value: The value of all incidents reported by an employee
    """
    try:
        return await retrieve_the_value_of_all_incidents_reported_by_an_employee_service(
            _employee_id
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/employee/max/{_employee_id}")
async def retrieve_the_most_notorious_incident_reported_by_an_employee_router(
    _employee_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve the highest value incident reported by an employee

    Args:
        _employee_id (int): The id of an employee
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised when the router goes wrong

    Returns:
        ReadIncident: The most notorious incident
    """
    try:
        return await retrieve_the_most_notorious_incident_reported_by_an_employee_service(
            _employee_id,
            _db
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/employee/top_ten/{_employee_id}")
async def retrieve_the_ten_most_valuable_incidents_reported_by_an_employee_router(
    _employee_id: int,
    _db: Session = Depends(get_db)
):
    """The endpoint to retrieve the ten most valuable incidents reported by an employee

    Args:
        _employee_id (int): The id of an employee
        _db (Session, optional): The database session. Defaults to Depends(get_db).

    Raises:
        HTTPException: A 400 is raised when the router goes wrong

    Returns:
        list: A list of the ten most valuable incidents
    """
    try:
        return await retrieve_the_ten_most_valuable_incidents_reported_by_an_employee_service(_employee_id, _db)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/incidents/region/graphing_data/{_region_id}")
async def retrieve_the_region_graphing_data_router(_region_id: int):
    """The endpoint to retrieve the overall graphing data

    Args:
        _region_id (int): The region id

    Raises:
        HTTPException: A 400 is raised when the router goes wrong

    Returns:
        dict: A dict containing the graphing data
    """
    try:
        return await retrieve_a_regions_graphing_data_service(_region_id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/incidents/store_section/graphing_data/{_store_section_id}")
async def retrieve_a_store_sections_graphing_data_router(
    _store_section_id: int
):
    """The router function to get the graphing data of a single store section

    Args:
        _store_section_id (int): The id of the store section

    Raises:
        HTTPException: A 400 is raised incase anything goes wrong

    Returns:
        dict: The graphing data
    """
    try:
        return await retrieve_a_store_sections_graphing_data_service(_store_section_id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/incidents/employee/graphing_data/{_employee_id}")
async def retrieve_an_employees_graphing_data_router(
    _employee_id: int
):
    """The router function to get an employees graphing data

    Args:
        _employee_id (int): The id of the employee

    Raises:
        HTTPException: A 400 is raised incase anything goes wring

    Returns:
        dict: A dict with the graphing data
    """
    try:
        return await retrieve_an_employees_graphing_data_service(_employee_id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc


@incidents_router.get("/incidents/overall/graphing_data")
async def retrieve_the_overall_graphing_data_router():
    """The router function to get the overall graphing data

    Raises:
        HTTPException: A 400 is raised incase anything goes wrong

    Returns:
        dict: A dict with the graphing data
    """
    try:
        return await retrieve_the_overall_graphing_data_service()
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc)
        ) from exc
