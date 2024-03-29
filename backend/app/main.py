"""The main file for the application"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.auth_router import auth_router
from routers.employees_router import employees_router
from routers.incidents_router import incidents_router
from routers.regions_router import regions_router
from routers.store_sections_router import store_sections_router
from routers.stores_router import stores_router

app = FastAPI(title="Achievo Data Analysis Backend",
              description="The backend of a loss control data analysis application",
              version="0.2.0")


origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


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
app.include_router(incidents_router)
app.include_router(auth_router)
