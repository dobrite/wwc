from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from datetime import datetime

from sqlalchemy import Text
from sqlalchemy import Index
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Unicode
from sqlalchemy import DateTime

from sqlalchemy.sql import expression

from sqlalchemy.ext.compiler import compiles

from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker

from zope.sqlalchemy import ZopeTransactionExtension

from horus.models import GroupMixin
from horus.models import UserMixin
from horus.models import UserGroupMixin
from horus.models import ActivationMixin
from horus.models import BaseModel as HorusBaseModel

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base(cls=HorusBaseModel)


class UTCNow(expression.FunctionElement):
    type = DateTime()


@compiles(UTCNow, 'postgresql')
def pg_utcnow(element, compiler, **kw):
    return "TIMEZONE('utc', CURRENT_TIMESTAMP)"


class TimeMixin(object):
    """Mixin Class which adds a create and modified column automatically
    """

    created_on = Column(DateTime, server_default=UTCNow())
    modified_on = Column(DateTime, onupdate=datetime.utcnow)

class User(UserMixin, TimeMixin, Base):
    reddit_auth_token = Column(Unicode(255))
    #this needs to be one-to-many to the auth provider/token table


class Group(GroupMixin, TimeMixin, Base):
    pass


class UserGroup(UserGroupMixin, TimeMixin, Base):
    pass


class Activation(ActivationMixin, TimeMixin, Base):
    pass


