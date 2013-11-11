import os

from pyramid.response import Response
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPFound

from deform import Form

from velruse import login_url

from wwc.models import User
from wwc.models import DBSession

from wwc.utils import get_client_token
from wwc.utils import generate_username


@view_config(route_name='chat',
             renderer="wwc:templates/chat.mako")
def chat_view(request):
    session = request.session
    if 'wwc.token' in session:
        username = session.get('wwc.username', '')
        project_id = session.get('wwc.project_id', '')
        settings = request.registry.settings
        secret_key = settings['centrifuge.secret_key']
        #TODO move username to info and use user id
        #json dumps for user_info is encoded to utf-8 by webob.
        #centrifuge doesn't so we get token mismatch
        token = get_client_token(secret_key, project_id, username)
        if session['wwc.token'] == token:
            return {'token': token,
                    'project_id': project_id,
                    'username': username,
                    'debug': settings.get('debugtoolbar.enabled', False)}
        else:
            del session['wwc.token']
    return HTTPFound(location='/login')


@view_config(route_name='index',
             renderer='wwc:templates/index.mako')
def index_view(request):
    return {}


@view_config(route_name='login_choice',
             renderer='wwc:templates/login_choice.mako')
def login_choice_view(request):
    return {}


def set_session_token(request, username):
    project_id = request.registry.settings['centrifuge.project_id']
    secret_key = request.registry.settings['centrifuge.secret_key']
    token = get_client_token(secret_key, project_id, username)
    session = request.session
    session['wwc.token'] = token
    session['wwc.username'] = username
    session['wwc.project_id'] = project_id


@view_config(route_name='login_guest')
def login_guest_view(request):
    username = generate_username()
    set_session_token(request, username)
    return HTTPFound(location='/chat')


@view_config(context='velruse.providers.reddit.RedditAuthenticationComplete')
def reddit_login_complete_view(request):
    username = request.context.profile['preferredUsername']
    set_session_token(request, username)
    return HTTPFound(location='/chat')


@view_config(context='velruse.AuthenticationDenied',
             renderer='wwc:templates/mytemplate.mako')
def login_complete_view(request):
    return {'result': 'denied', }
