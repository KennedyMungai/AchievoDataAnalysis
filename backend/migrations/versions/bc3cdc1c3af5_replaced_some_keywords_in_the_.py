"""Replaced some keywords in the relationship function call

Revision ID: bc3cdc1c3af5
Revises: 30a963de86d3
Create Date: 2023-12-07 16:22:02.387897

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bc3cdc1c3af5'
down_revision: Union[str, None] = '30a963de86d3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
