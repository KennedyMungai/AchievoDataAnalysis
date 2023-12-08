"""The incidents router file"""
from typing import List

from database.db import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from schemas.incident_schema import (CreateIncident, ReadIncident,
                                     UpdateIncident)
from services.incident_services import (create_incident_service,
                                        delete_incident_service,
                                        retrieve_all_incidents_service,
                                        retrieve_one_incident_service,
                                        update_incident_service)
from sqlalchemy.orm import Session

incidents_router = APIRouter(prefix="/incidents", tags=["Incidents"])


@incidents_router.post("/", status_code=status.HTTP_201_CREATED)
async def create_incident_endpoint(
    _incident_data: CreateIncident,
    _db: Session = Depends(get_db)
) -> ReadIncident:
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


@incidents_router.get("/", response_model=List[ReadIncident])
async def retrieve_all_incidents_endpoint(
    _db: Session = Depends(get_db)
) -> List[ReadIncident]:
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


@incidents_router.get("/{_incident_id}", response_model=ReadIncident)
async def retrieve_one_incident_endpoint(
    _incident_id: int,
    _db: Session = Depends(get_db)
) -> ReadIncident:
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
) -> ReadIncident:
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
) -> None:
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
