from pyramid import testing

from wwc.tests import BaseTestCase


class TestViews(BaseTestCase):
    def _make_context(self):
        class TestContext:
            provider_type = "reddit"
            profile = {
                "accounts": [{
                    "userid": "abc123",
                    "username": "username",
                    "domain": "reddit.com"
                }],
                "displayName": "username",
                "preferredUsername": "username"
            }
            credentials = {"oauthAccessToken": "super-secret"}
            provider_name = "reddit"

        return TestContext

    def test_all_view(self):
        from wwc.views import all
        from wwc.tests.factories import UserFactory
        UserFactory.FACTORY_SESSION = self.session
        request = testing.DummyRequest()
        user = UserFactory()
        user = all(request)
        self.assertEqual(user['username'], 'dave')
        self.assertEqual(user['email'], 'dave@example.com')

    def test_reddit_login_complete_view(self):
        from wwc.views import reddit_login_complete_view
        request = testing.DummyRequest()
        request.context = self._make_context()
        form = reddit_login_complete_view(request)
        self.assertEqual(user['username'], 'dave')
        self.assertEqual(user['email'], 'dave@example.com')
