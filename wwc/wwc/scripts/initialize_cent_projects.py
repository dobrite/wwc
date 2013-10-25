from cent.core import Client

from wwc.scripts.initialize_cent_config import load_config
from wwc.scripts.initialize_cent_config import add_section
from wwc.scripts.initialize_cent_config import change_cwd_to_pkg_root


def create_project(name, config):
    client = Client("http://localhost:8000/api", "_", config['api_secret'])
    result, error = client.send(
        "project_create", {
            "name": name,
            "display_name": name,
        }
    )
    if not result['error']:
        project_id = result['body'][0]
        secret_key = result['body'][7]
        add_section(section_name=name,
                    address='http://localhost:8000/api',
                    project_id=project_id,
                    secret_key=secret_key,)
        client = Client("http://localhost:8000/api", project_id, secret_key)
        result, error = client.send(
            "namespace_create", {
                "name": name,
                "publish": 1,
                "presence": 1,
                "history": 1,
                "join_leave": 1,
            }
        )


def main():
    change_cwd_to_pkg_root()
    config = load_config()
    create_project('wwc', config)
    create_project('test', config)
