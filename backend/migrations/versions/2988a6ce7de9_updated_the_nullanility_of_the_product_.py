"""Updated the nullanility of the product information

Revision ID: 2988a6ce7de9
Revises: 8d0487405d68
Create Date: 2023-12-14 11:04:44.327650

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '2988a6ce7de9'
down_revision: Union[str, None] = '8d0487405d68'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('incidents', 'product_name',
               existing_type=mysql.VARCHAR(length=50),
               nullable=True)
    op.alter_column('incidents', 'product_code',
               existing_type=mysql.VARCHAR(length=50),
               nullable=True)
    op.alter_column('incidents', 'product_quantity',
               existing_type=mysql.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('incidents', 'product_quantity',
               existing_type=mysql.INTEGER(),
               nullable=False)
    op.alter_column('incidents', 'product_code',
               existing_type=mysql.VARCHAR(length=50),
               nullable=False)
    op.alter_column('incidents', 'product_name',
               existing_type=mysql.VARCHAR(length=50),
               nullable=False)
    # ### end Alembic commands ###
