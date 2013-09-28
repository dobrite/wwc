import os

from pyramid.response import Response
from pyramid.view import view_config

from sqlalchemy.exc import DBAPIError

from .models import DBSession


_here = os.path.dirname(__file__)
_index_path = os.path.join(_here, '..', '..', 'app', 'index.html')

with open(_index_path) as f:
    _index = f.read()

_index_response = Response(content_type='text/html', body=_index)

@view_config(route_name='index.html')
def index_view(request):
    return _index_response

