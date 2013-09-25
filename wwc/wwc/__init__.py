import os

from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from .models import DBSession
from .models import Base

def add_static(config):
    app_path = os.path.join('..', '..', 'app')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_static_view('app', app_path, cache_max_age=3600)


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config = Configurator(settings=settings)
    config.include('pyramid_mako')
    config.add_route('home', '/')
    add_static(config)
    config.scan()
    return config.make_wsgi_app()
