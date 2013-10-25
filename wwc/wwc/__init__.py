import os
import pkg_resources

from configparser import ConfigParser

from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from hem.interfaces import IDBSession
from horus.interfaces import IUserClass
from horus.interfaces import IActivationClass

from wwc.models import DBSession
from wwc.models import Base
from wwc.models import User
from wwc.models import Activation


def get_secret_settings(section):
    pkgroot = pkg_resources.get_distribution('wwc').location
    secrets_ini = os.path.join(pkgroot, 'secrets.ini')
    config_parser = ConfigParser()
    with open(secrets_ini) as f:
        config_parser.readfp(f)
    return dict(config_parser.items(section))


def add_static(config):
    """ Add static paths for Marionette app
    """
    here = os.path.abspath(os.path.dirname(__file__))
    app_path = os.path.join(here, '..', '..', 'app')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_static_view('app', app_path, cache_max_age=0)
    config.add_static_view('static_deform', 'deform:static')


def add_horus(config):
    """ Add horus user models
    """
    config.registry.registerUtility(DBSession, IDBSession)
    config.registry.registerUtility(User, IUserClass)
    config.registry.registerUtility(Activation, IActivationClass)
    config.include('horus')


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config = Configurator(settings=settings)
    config.add_settings(get_secret_settings('mandrill'))
    config.add_settings(get_secret_settings('velruse.reddit'))
    config.add_settings(get_secret_settings('centrifuge'))
    config.include('pyramid_mako')
    config.include('pyramid_redis_sessions')
    config.include('pyramid_mailer')
    config.include('velruse.providers.reddit')
    config.add_reddit_login_from_settings(prefix='velruse.reddit.')
    config.add_route('index', '/')
    add_static(config)
    add_horus(config)
    config.scan()
    return config.make_wsgi_app()
