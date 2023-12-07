"""The main file for the application"""
from fastapi import FastAPI


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
