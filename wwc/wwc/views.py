import os
import json

from pyramid.response import Response
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound

from deform import Form

from velruse import login_url

from wwc.models import User
from wwc.models import DBSession

from wwc.schemas import RedditLoginSchema

from wwc.utils import get_client_token


_here = os.path.dirname(__file__)
_chat_path = os.path.join(_here, '..', '..', 'app', 'chat.html')

with open(_chat_path) as f:
    _chat = f.read()

_chat_response = Response(content_type='text/html', body=_chat)


@view_config(route_name='index')
def index_view(request):
    #TODO once we get users into the DB remove all cookie info and inject
    #directly into template
    #json dumps for user_info is encoded to utf-8 by webob.
    #centrifuge doesn't so we get token mismatch
    if 'wwc.token' in request.cookies:
        username = request.cookies.get('wwc.username', '')
        project_id  = request.cookies.get('wwc.project_id', '')
        secret_key = request.registry.settings['centrifuge.secret_key']
        #TODO move username to info and use user id
        token = get_client_token(secret_key, project_id, username)
        if request.cookies['wwc.token'] == token:
            return _chat_response
    return HTTPFound(location='/login/reddit')


@view_config(
    context='velruse.providers.reddit.RedditAuthenticationComplete',
    renderer='wwc:templates/result.mak',
)
def reddit_login_complete_view(request):
    project_id = request.registry.settings['centrifuge.project_id']
    secret_key = request.registry.settings['centrifuge.secret_key']
    username = request.context.profile['preferredUsername']
    token = get_client_token(secret_key, project_id, username)
    redirect = HTTPFound(location='/')
    redirect.set_cookie('wwc.token', token)
    redirect.set_cookie('wwc.username', username)
    redirect.set_cookie('wwc.project_id', project_id)
    return redirect


@view_config(
    context='velruse.AuthenticationDenied',
    renderer='wwc:templates/mytemplate.mak',
)
def login_complete_view(request):
    return {'result': 'denied', }
