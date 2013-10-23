from wwc.tests import IntegrationTestBase


class IntegrationTests(IntegrationTestBase):
    def test_login_reddit(self):
        res = self.testapp.get('/login/reddit', status=302)
        assert res.status_code == 302
        assert 'ssl.reddit.com' in res.location

    #def test_login_complete_view(self):
    #    res = self.testapp.get('/login/reddit/callback?state=abc', status=200)
