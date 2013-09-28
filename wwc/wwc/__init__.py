import os

from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from .models import DBSession
from .models import Base


def add_static(config):
    app_path = os.path.join('..', '..', 'app')
    bower_path = os.path.join(app_path, 'bower_components')
    scripts_path = os.path.join(app_path, 'scripts')
    templates_path = os.path.join(app_path, 'templates')
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_static_view('app', app_path, cache_max_age=0)
    config.add_static_view('bower_components', bower_path, cache_max_age=0)
    config.add_static_view('scripts', scripts_path, cache_max_age=0)
    config.add_static_view('templates', templates_path, cache_max_age=0)


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    config = Configurator(settings=settings)
    config.include('pyramid_mako')
    config.add_route('index.html', '/')
    add_static(config)
    config.scan()
    return config.make_wsgi_app()
