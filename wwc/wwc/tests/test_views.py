from pyramid import testing

from mock import Mock
from mock import patch

from wwc.tests import BaseTestCase


class TestViews(BaseTestCase):
    def _make_registry(self):
        class MockRegistry:
            settings = {'centrifuge.secret_key': 'abc'}
        return MockRegistry


    def _make_session(self):
        session = {}
        session['wwc.token'] = '0f3aca354209d9ae8b2db4ff228d1e24'
        session['wwc.project_id'] = '123'
        session['wwc.username'] = 'dave'
        return session

    def _make_context(self):
        class TestContext:
            provider_type = "reddit"
            profile = {
                "accounts": [{
                    "userid": "abc123",
                    "username": "r_username",
                    "domain": "reddit.com"
                }],
                "displayName": "r_username",
                "preferredUsername": "r_username"
            }
            credentials = {"oauthAccessToken": "super-secret"}
            provider_name = "reddit"

        return TestContext


    def test_chat_view_debug_false(self):
        from wwc.views import chat_view
        request = testing.DummyRequest()
        request.session = self._make_session()
        request.registry = self._make_registry()
        request.registry.settings['debugtoolbar.enabled'] = False
        ret = chat_view(request)
        assert ret['debug'] == False


    def test_chat_view_debug_true(self):
        from wwc.views import chat_view
        request = testing.DummyRequest()
        request.session = self._make_session()
        request.registry = self._make_registry()
        request.registry.settings['debugtoolbar.enabled'] = True
        ret = chat_view(request)
        assert ret['debug'] == True


    def test_chat_view_debug_none(self):
        from wwc.views import chat_view
        request = testing.DummyRequest()
        request.session = self._make_session()
        request.registry = self._make_registry()
        ret = chat_view(request)
        assert ret['debug'] == False


    def test_chat_view_valid_token(self):
        from wwc.views import chat_view
        request = testing.DummyRequest()
        request.registry = self._make_registry()
        token = '0f3aca354209d9ae8b2db4ff228d1e24'
        project_id = '123'
        username = 'dave'
        session = {}
        session['wwc.token'] = token
        session['wwc.project_id'] = project_id
        session['wwc.username'] = username
        request.session = session
        ret = chat_view(request)
        assert ret['username'] == username
        assert ret['project_id'] == project_id
        assert ret['token'] == token
        assert 'debug' in ret


    def test_chat_view_invalid_token(self):
        from wwc.views import chat_view
        from pyramid.httpexceptions import HTTPFound
        request = testing.DummyRequest()
        request.registry = self._make_registry()
        request.session = self._make_session()
        mock = Mock(return_value='abc')
        with patch('wwc.views.get_client_token', mock):
            ret = chat_view(request)
            assert isinstance(ret, HTTPFound)
            assert ret.location == '/login'
            assert ret.code == 302
            assert 'wwc.token' not in request.session


    def test_chat_view_no_token(self):
        from wwc.views import chat_view
        from pyramid.httpexceptions import HTTPFound
        request = testing.DummyRequest()
        request.session = {}
        ret = chat_view(request)
        assert isinstance(ret, HTTPFound)
        assert ret.location == '/login'
        assert ret.code == 302

    #def test_all_view(self):
    #    from wwc.views import all
    #    from wwc.tests.factories import UserFactory
    #    UserFactory.FACTORY_SESSION = self.session
    #    request = testing.DummyRequest()
    #    user = UserFactory()
    #    user = all(request)
    #    assert user['username'] == 'dave'
    #    assert user['email'] == 'dave@example.com'

    #def test_reddit_login_complete_view(self):
    #    from wwc.views import reddit_login_complete_view
    #    request = testing.DummyRequest()
    #    request.context = self._make_context()
    #    resp = reddit_login_complete_view(request)
    #    assert 'reqts' in resp
    #    assert 'r_username' in resp['form']
