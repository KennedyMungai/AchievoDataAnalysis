"""Deleted the is_resolved column on the incidents table

Revision ID: 6bb7fc3e653f
Revises: ffe21128c02d
Create Date: 2024-01-10 10:50:35.678075

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '6bb7fc3e653f'
down_revision: Union[str, None] = 'ffe21128c02d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('incidents', 'is_resolved')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('incidents', sa.Column('is_resolved', mysql.TINYINT(display_width=1), autoincrement=False, nullable=False))
    # ### end Alembic commands ###