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
    if 'wwc.token' in request.cookies:
        username = request.cookies.get('wwc.username', '')
        project_id = request.cookies.get('wwc.project_id', '')
        secret_key = request.registry.settings['centrifuge.secret_key']
        #TODO move username to info and use user id
        #json dumps for user_info is encoded to utf-8 by webob.
        #centrifuge doesn't so we get token mismatch
        token = get_client_token(secret_key, project_id, username)
        if request.cookies['wwc.token'] == token:
            return {'token': token,
                    'project_id': project_id,
                    'username': username,
                    'debug': True}
        else:
            redirect = HTTPFound(location='/login')
            redirect.set_cookie('wwc.token', None)
            return redirect
    return HTTPFound(location='/login')


@view_config(route_name='index',
             renderer='wwc:templates/index.mako')
def index_view(request):
    return {}


@view_config(route_name='login_choice',
             renderer='wwc:templates/login.mako')
def login_choice_view(request):
    return {}


@view_config(route_name='login_guest')
def login_guest_view(request):
    project_id = request.registry.settings['centrifuge.project_id']
    secret_key = request.registry.settings['centrifuge.secret_key']
    username = generate_username()
    token = get_client_token(secret_key, project_id, username)
    redirect = HTTPFound(location='/chat')
    redirect.set_cookie('wwc.token', token)
    redirect.set_cookie('wwc.username', username)
    redirect.set_cookie('wwc.project_id', project_id)
    return redirect


@view_config(context='velruse.providers.reddit.RedditAuthenticationComplete')
def reddit_login_complete_view(request):
    project_id = request.registry.settings['centrifuge.project_id']
    secret_key = request.registry.settings['centrifuge.secret_key']
    username = request.context.profile['preferredUsername']
    token = get_client_token(secret_key, project_id, username)
    redirect = HTTPFound(location='/chat')
    redirect.set_cookie('wwc.token', token)
    redirect.set_cookie('wwc.username', username)
    redirect.set_cookie('wwc.project_id', project_id)
    return redirect


@view_config(context='velruse.AuthenticationDenied',
             renderer='wwc:templates/mytemplate.mako')
def login_complete_view(request):
    return {'result': 'denied', }
