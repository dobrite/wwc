import os
import pkg_resources

from wwc.tests import BaseTestCase


class TestWWC(BaseTestCase):
    def test_main_returns_wsgi_app(self):
        from pyramid.router import Router
        from paste.deploy.loadwsgi import appconfig

        from wwc import main

        pkgroot = pkg_resources.get_distribution('wwc').location
        test_ini_path = os.path.join(pkgroot, 'test.ini')
        settings = appconfig('config:{}'.format(test_ini_path))

        wsgi_ = main({}, **settings)

        assert isinstance(wsgi_, Router)
