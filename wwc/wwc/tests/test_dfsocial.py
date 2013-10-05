from wwc.tests import BaseTestCase


class TestWWC(BaseTestCase):
    def test_main_returns_wsgi_app(self):
        from pyramid.router import Router
        from paste.deploy.loadwsgi import appconfig

        from wwc import main

        settings = appconfig('config:test.ini', relative_to='./')
        wsgi_ = main({}, **settings)

        assert isinstance(wsgi_, Router)
