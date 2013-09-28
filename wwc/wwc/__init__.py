import os
import logging
from configparser import ConfigParser

from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from hem.interfaces import IDBSession
from horus.interfaces import IUserClass
from horus.interfaces import IActivationClass

from .models import DBSession
from .models import Base
from .models import User
from .models import Activation

LOG = logging.getLogger(__name__)
HERE = os.path.abspath(os.path.dirname(__file__))

def get_secret_settings(section):
    config_parser = ConfigParser()
    with open(os.path.join(HERE, '..', 'secrets.ini')) as f:
        config_parser.readfp(f)
    return dict(config_parser.items(section))


def add_static(config):
    """ Add static paths for Marionette app
    """
    app_path = os.path.join(HERE, '..', '..', 'app')
    bower_path = os.path.join(app_path, 'bower_components')
    scripts_path = os.path.join(app_path, 'scripts')
    templates_path = os.path.join(app_path, 'templates')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_static_view('bower_components', bower_path, cache_max_age=0)
    config.add_static_view('scripts', scripts_path, cache_max_age=0)
    config.add_static_view('templates', templates_path, cache_max_age=0)

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
    config.include('pyramid_mako')
    config.include('pyramid_redis_sessions')
    config.include('pyramid_mailer')
    config.add_settings(get_secret_settings('mandrill'))
    config.add_route('index', '/')
    add_static(config)
    add_horus(config)
    config.scan()
    return config.make_wsgi_app()

