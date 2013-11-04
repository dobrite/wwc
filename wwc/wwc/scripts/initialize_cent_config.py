import os
import json
import pkg_resources

from hashlib import sha256

from configparser import ConfigParser


def change_cwd_to_project_root():
    project_root = pkg_resources.get_distribution('wwc').location
    root_dir = os.path.join(project_root, '..')
    os.chdir(root_dir)


def load_config():
    if os.path.isfile('config.json'):
        filename = 'config.json'
    else:
        filename = 'example_config.json'
    with open(filename) as f:
        return json.loads(f.read())


def write_config(config):
    with open("config.json", 'w') as f:
        f.write(json.dumps(config,
                sort_keys=True,
                indent=4,
                separators=(',', ': ')))


def generate_key():
    rand = os.urandom(20)
    return sha256(sha256(rand).digest()).hexdigest()


def update_centrc(config):
    cp = ConfigParser()
    with open('.centrc', 'r') as f:
        cp.readfp(f)
    cp.set('superuser', 'secret_key', config['api_secret'])
    with open('.centrc', 'w') as f:
        cp.write(f)


def add_superuser(config):
    return add_section(section_name='superuser',
                       address='http://localhost:8000/api',
                       project_id='_',
                       secret_key=config['api_secret'],
                       timeout='5', )


def add_section(**section):
    name = section['section_name']
    cp = ConfigParser()
    cp.add_section(name)
    for k, v in section.items():
        if k != 'section_name':
            cp.set(name, k, v)
    return cp


def write_cp(cp):
    with open('.centrc', 'a') as f:
        cp.write(f)


def main():
    change_cwd_to_project_root()
    config = load_config()
    if not 'api_secret' in config:
        config['api_secret'] = generate_key()
    if not 'cookie_secret' in config:
        config['cookie_secret'] = generate_key()
    if not os.path.isfile('.centrc'):
        write_cp(add_superuser(config))
    else:
        update_centrc(config)
    write_config(config)
