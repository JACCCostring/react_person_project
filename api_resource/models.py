from database import Base
from sqlalchemy import Column, Integer, String

import uuid

def get_uuid():
    return str( uuid.uuid4() )

class Person(Base):
    __tablename__ = 'person'

    id = Column('id', String, primary_key=True, default=get_uuid, index=True)

    firstName = Column(String)
    lastName = Column(String)
    age = Column(Integer)
    phone = Column(String)