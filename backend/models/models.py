"""The models file for the application"""
from datetime import datetime

from database.db import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship


class Regions(Base):
    """The class for the regions table

    Args:
        Base (Declarative Base): The base class for the region table
    """
    __tablename__ = "regions"

    region_id = Column(Integer, primary_key=True,
                       index=True, autoincrement=True, unique=True)
    region_name = Column(String(50), nullable=False)
    created_at = Column(String(50), nullable=False, default=datetime.utcnow)
    updated_at = Column(String(50), nullable=True, onupdate=datetime.utcnow)

    incidents = relationship("Incidents", backref="regions")
    employees = relationship("Employees", backref="regions")
    stores = relationship("Stores", backref="regions")


class Stores(Base):
    """The stores table class. This is the class for the stores table.

    Args:
        Base (Declarative Base): The base class for the stores table
    """
    __tablename__ = "stores"

    store_id = Column(Integer, primary_key=True, index=True,
                      autoincrement=True, unique=True)
    store_name = Column(String(50), nullable=False)
    store_location = Column(String(50), nullable=False)
    created_at = Column(String(50), nullable=False, default=datetime.utcnow)
    updated_at = Column(String(50), nullable=True, onupdate=datetime.utcnow)

    region_id = Column(Integer, ForeignKey(
        "regions.region_id"), nullable=False)

    incidents = relationship("Incidents", backref="stores")
    store_sections = relationship("StoreSections", backref="stores")
    employees = relationship("Employees", backref="stores")


class Employees(Base):
    """The employees table class. This is the class for the employees table.

    Args:
        Base (Declarative Bade): The base class for the model classes
    """
    __tablename__ = "employees"

    employee_id = Column(Integer, primary_key=True,
                         index=True, autoincrement=True, unique=True)
    employee_name = Column(String(50), nullable=False)
    employee_email = Column(String(50), nullable=False)
    employee_phone_number = Column(String(50), nullable=False)
    employee_job_title = Column(String(50), nullable=False)
    employee_password = Column(String(255), nullable=False)
    created_at = Column(String(50), nullable=False, default=datetime.utcnow)
    updated_at = Column(String(50), nullable=True, onupdate=datetime.utcnow)

    store_id = Column(Integer, ForeignKey("stores.store_id"), nullable=False)
    region_id = Column(Integer, ForeignKey(
        "regions.region_id"), nullable=False)

    incidents = relationship("Incidents", backref="employees")


class StoreSections(Base):
    """The store sections table class. This is the class for the store sections table.

    Args:
        Base (Declarative Base): The base class for the model classes
    """
    __tablename__ = "store_sections"

    store_section_id = Column(
        Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    store_section_name = Column(String(50), nullable=False)
    created_at = Column(String(50), nullable=False, default=datetime.utcnow)
    updated_at = Column(String(50), nullable=True, onupdate=datetime.utcnow)

    store_id = Column(Integer, ForeignKey("stores.store_id"), nullable=False)

    incidents = relationship("Incidents", backref="store_sections")


class Incidents(Base):
    """The incidents class for the incidents table

    Args:
        Base (Declarative Base): The base class for the classes
    """
    __tablename__ = "incidents"

    incident_id = Column(Integer, primary_key=True,
                         index=True, autoincrement=True, unique=True)
    incident_description = Column(String(255), nullable=False)
    product_name = Column(String(50), nullable=True)
    product_code = Column(String(50), nullable=True)
    product_quantity = Column(Integer, nullable=True)
    product_price = Column(Float, nullable=True)
    total_value = Column(Float, nullable=False)
    created_at = Column(String(50), nullable=False, default=datetime.utcnow)
    updated_at = Column(String(50), nullable=True, onupdate=datetime.utcnow)

    store_section_id = Column(Integer, ForeignKey(
        "store_sections.store_section_id"), nullable=False)
    employee_id = Column(Integer, ForeignKey(
        "employees.employee_id"), nullable=False)
    store_id = Column(Integer, ForeignKey("stores.store_id"), nullable=False)
    region_id = Column(Integer, ForeignKey(
        "regions.region_id"), nullable=False)
