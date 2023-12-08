"""The main file for the application"""
from fastapi import FastAPI
from routers.employees_router import employees_router
from routers.regions_router import regions_router
from routers.store_sections_router import store_sections_router
from routers.stores_router import stores_router

app = FastAPI(title="Achievo Data Analysis Backend",
              description="The backend of a loss control data analysis application",
              version="0.2.0")


@app.get("/")
async def root():
    """The root endpoint for the application.

    Returns:
        dict: A simple message
    """
    return {"message": "Hello World"}


app.include_router(regions_router)
app.include_router(stores_router)
app.include_router(employees_router)
app.include_router(store_sections_router)