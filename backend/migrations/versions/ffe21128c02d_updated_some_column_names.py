"""Updated some column names

Revision ID: ffe21128c02d
Revises: 2988a6ce7de9
Create Date: 2023-12-15 09:57:35.797553

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'ffe21128c02d'
down_revision: Union[str, None] = '2988a6ce7de9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('incidents', sa.Column('total_value', sa.Float(), nullable=False))
    op.alter_column('incidents', 'product_price',
               existing_type=mysql.FLOAT(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('incidents', 'product_price',
               existing_type=mysql.FLOAT(),
               nullable=False)
    op.drop_column('incidents', 'total_value')
    # ### end Alembic commands ###
