from fastapi import FastAPI, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine

import models

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000',
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

class PersonBase(BaseModel):
    firstName: str
    lastName: str
    age: int
    phone: str

class PersonModel(PersonBase):
    id: str

    class Config:
        # orm_mode = True
        from_attributes = True


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.get('/all_person/', response_model=List[PersonModel])
async def get_all_person(db: db_dependency):
    db_people = db.query(models.Person).all()

    return db_people

@app.get('/all_person/{uuid_person}/', response_model=PersonModel)
async def get_one_person(uuid_person: str, db: db_dependency):
    db_person = db.query(models.Person).where(models.Person.id == uuid_person).first()

    return db_person

@app.post('/all_person/', response_model=PersonModel)
async def add_one_person(person: PersonBase, db: db_dependency):
    db_person = models.Person( **person.model_dump() )

    db.add(db_person)
    db.commit()
    db.refresh(db_person)

    return db_person

@app.put('/all_person/{uuid_person}/', response_model=PersonBase)
async def update_person(uuid_person: str, person: PersonBase, db: db_dependency):
    db_person = db.query(models.Person).filter(models.Person.id == uuid_person).first()

    db_person.firstName = person.firstName
    db_person.lastName = person.lastName
    db_person.age = person.age
    db_person.phone = person.phone

    db.commit()

    return db_person

@app.delete('/all_person/{uuid_person}/', response_model=PersonModel)
async def remove_person(uuid_person: str, db: db_dependency):
    db_person = db.query(models.Person).where(models.Person.id == uuid_person).first()

    db.delete(db_person)
    db.commit()

    return db_person