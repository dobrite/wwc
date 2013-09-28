from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from sqlalchemy import Column
from sqlalchemy import Index
from sqlalchemy import Integer
from sqlalchemy import Text

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker

from zope.sqlalchemy import ZopeTransactionExtension

from horus.models import GroupMixin
from horus.models import UserMixin
from horus.models import UserGroupMixin
from horus.models import ActivationMixin
from horus.models import BaseModel

DBSession = scoped_session(sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base(cls=BaseModel)


class User(UserMixin, Base):
    pass


class Group(GroupMixin, Base):
    pass


class UserGroup(UserGroupMixin, Base):
    pass


class Activation(ActivationMixin, Base):
    pass

