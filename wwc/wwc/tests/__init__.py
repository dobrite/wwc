import os
import unittest
import pkg_resources

from pyramid import testing

from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker

from paste.deploy.loadwsgi import appconfig

from hem.interfaces import IDBSession
from horus.interfaces import IActivationClass
from horus.interfaces import IUserClass

from wwc.models import User
from wwc.models import Activation


class BaseTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        pkgroot = pkg_resources.get_distribution('wwc').location
        test_ini_path = os.path.join(pkgroot, 'test.ini')
        settings = appconfig('config:{}'.format(test_ini_path))
        cls.engine = engine_from_config(settings, prefix='sqlalchemy.')
        cls.Session = sessionmaker()

    def setUp(self):
        self.config = testing.setUp()
        self.connection = connection = self.engine.connect()
        self.trans = connection.begin()
        self.session = self.Session(bind=connection)

        self.config.registry.registerUtility(self.session, IDBSession)
        self.config.registry.registerUtility(Activation, IActivationClass)
        self.config.registry.registerUtility(User, IUserClass)

    def tearDown(self):
        testing.tearDown()
        self.trans.rollback()
        self.session.close()
