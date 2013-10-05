from factory.alchemy import SQLAlchemyModelFactory

from wwc.models import User
from wwc.models import DBSession


class UserFactory(SQLAlchemyModelFactory):
    FACTORY_FOR = User
    FACTORY_SESSION = DBSession

    username = 'dave'
    email = 'dave@example.com'
    password = 'secret'
