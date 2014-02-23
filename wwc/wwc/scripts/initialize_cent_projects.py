import os
import shutil
import pkg_resources
from configparser import ConfigParser

from cent.core import Client

from wwc.scripts.initialize_cent_config import load_config
from wwc.scripts.initialize_cent_config import add_section
from wwc.scripts.initialize_cent_config import write_cp
from wwc.scripts.initialize_cent_config import change_cwd_to_project_root


def create_project(name, config):
    client = Client("http://localhost:8000/api", "_", config['api_secret'])
    result, error = client.send("project_create", {"name": name,
                                                   "display_name": name, })
    if not result['error']:
        project_id = result['body']['_id']
        secret_key = result['body']['secret_key']
        return project_id, secret_key


def create_namespace(name, project_id, secret_key):
    client = Client("http://localhost:8000/api", project_id, secret_key)
    result, error = client.send("namespace_create", {"name": name,
                                                     "publish": 1,
                                                     "presence": 1,
                                                     "history": 1,
                                                     "join_leave": 1, })


def add_to_centrc(name, project_id, secret_key):
    cp = add_section(section_name=name,
                     address='http://localhost:8000/api',
                     project_id=project_id,
                     secret_key=secret_key,
                     timeout='5', )
    write_cp(cp)


def add_to_secrets(project_id, secret_key):
    pkgroot = pkg_resources.get_distribution('wwc').location
    os.chdir(pkgroot)
    if not os.path.isfile('centrifuge.ini'):
        shutil.copy('centrifuge_example.ini', 'secrets.ini')
    cp = ConfigParser()
    with open('centrifuge.ini', 'r') as f:
        cp.readfp(f)
    cp.set('centrifuge', 'centrifuge.project_id', project_id)
    cp.set('centrifuge', 'centrifuge.secret_key', secret_key)
    with open('centrifuge.ini', 'w') as f:
        cp.write(f)


def main():
    change_cwd_to_project_root()
    config = load_config()
    project_id, secret_key = create_project('wwc', config)
    create_namespace('wwc', project_id, secret_key)
    add_to_centrc('wwc', project_id, secret_key)
    add_to_secrets(project_id, secret_key)

    change_cwd_to_project_root()
    project_id, secret_key = create_project('test', config)
    create_namespace('test', project_id, secret_key)
    add_to_centrc('test', project_id, secret_key)
