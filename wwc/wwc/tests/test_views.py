import unittest

from pyramid import testing

from wwc.models import DBSession
from wwc.tests import BaseTestCase


class TestMyViewSuccessCondition(BaseTestCase):
    def test_all_view(self):
        from wwc.views import all
        from wwc.tests.factories import UserFactory
        UserFactory.FACTORY_SESSION = self.session
        request = testing.DummyRequest()
        user = UserFactory()
        user = all(request)
        self.assertEqual(user['username'], 'dave')
        self.assertEqual(user['email'], 'dave@example.com')


#class TestMyViewFailureCondition(unittest.TestCase):
#    def test_failing_view(self):
#        from wwc.views import my_view
#        request = testing.DummyRequest()
#        info = my_view(request)
#        self.assertEqual(info.status_int, 500)
