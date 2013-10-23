import os
import json

from pyramid.response import Response
from pyramid.view import view_config

from deform import Form

from velruse import login_url

from wwc.models import User
from wwc.models import DBSession

from wwc.schemas import RedditLoginSchema


_here = os.path.dirname(__file__)
_index_path = os.path.join(_here, '..', '..', 'app', 'index.html')

with open(_index_path) as f:
    _index = f.read()

_index_response = Response(content_type='text/html', body=_index)


@view_config(route_name='index')
def index_view(request):
    return _index_response


@view_config(
    route_name='test',
    renderer='wwc:templates/result.mak',
)
def test_view(request):
    schema = RedditLoginSchema()
    form = Form(schema, buttons=('submit',))
    username = "username"
    reqts = form.get_widget_resources()
    return {
        'form': form.render({'username': username}),
        'reqts': reqts
    }


@view_config(
    context='velruse.providers.reddit.RedditAuthenticationComplete',
    renderer='wwc:templates/result.mak',
)
def reddit_login_complete_view(request):
    schema = RedditLoginSchema()
    form = Form(schema, buttons=('submit',))
    reqts = form.get_widget_resources()
    if 'submit' in request.params:
        controls = request.POST.items()
        try:
            appstruct = form.validate(controls)
        except deform.ValidationFailure as e:
            return {
                'form': e.render(),
                'reqts': reqts,
            }
    context = request.context
    username = context.profile['preferredUsername']
    return {
        'form': form.render({'username': username}),
        'reqts': reqts,
    }


@view_config(
    context='velruse.AuthenticationDenied',
    renderer='wwc:templates/mytemplate.mak',
)
def login_complete_view(request):
    return {'result': 'denied', }


@view_config(route_name='all', renderer='json')
def all(request):
    user = User.get_all(request).all()
    return user[0].__json__(request, convert_date=True)
