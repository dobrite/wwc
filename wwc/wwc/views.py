import os
import json

from pyramid.response import Response
from pyramid.view import view_config

from .models import DBSession


_here = os.path.dirname(__file__)
_index_path = os.path.join(_here, '..', '..', 'app', 'index.html')

with open(_index_path) as f:
    _index = f.read()

_index_response = Response(content_type='text/html', body=_index)


@view_config(route_name='index')
def index_view(request):
    return _index_response


@view_config(
    context='velruse.providers.reddit.RedditAuthenticationComplete',
    renderer='wwc:templates/mytemplate.mak',
)
def login_complete_view(request):
    context = request.context
    result = {
        'provider_type': context.provider_type,
        'provider_name': context.provider_name,
        'profile': context.profile,
        'credentials': context.credentials,
    }
    return {'result': json.dumps(result, indent=4), }


@view_config(
    context='velruse.AuthenticationDenied',
    renderer='wwc:templates/mytemplate.mak',
)
def login_complete_view(request):
    return {'result': 'denied', }
