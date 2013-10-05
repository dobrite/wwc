import unittest

from pyramid import testing

from wwc.models import DBSession
from wwc.tests import BaseTestCase


class TestMyViewSuccessCondition(BaseTestCase):
    def test_all_view(self):
        from wwc.views import all
        request = testing.DummyRequest()
        user = all(request)
        self.assertEqual(user['one'].name, 'one')
        self.assertEqual(user['project'], 'wwc')


#class TestMyViewFailureCondition(unittest.TestCase):
#    def test_failing_view(self):
#        from wwc.views import my_view
#        request = testing.DummyRequest()
#        info = my_view(request)
#        self.assertEqual(info.status_int, 500)
