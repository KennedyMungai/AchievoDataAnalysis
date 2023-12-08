"""The file for the password hashing functions"""
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def hash_password(_password: str) -> str:
    """The function for hashing passwords.

    Args:
        password (str): The password to hash.

    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(_password)


async def verify_password(_password: str, _hashed_password: str) -> bool:
    """The function for verifying passwords.

    Args:
        password (str): The password to verify.
        hashed_password (str): The hashed password to verify against.

    Returns:
        bool: True if the password matches the hashed password, False otherwise.
    """
    return pwd_context.verify(_password, _hashed_password)
