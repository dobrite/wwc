import os
import json
import pkg_resources

from hashlib import sha256

from configparser import ConfigParser


def change_cwd_to_pkg_root():
    pkgroot = pkg_resources.get_distribution('wwc').location
    root_dir = os.path.join(pkgroot, '..')
    os.chdir(root_dir)


def section_template(section):
    if 'timeout' not in section:
        section['timeout'] = 5

    template = ("[{section_name}]\naddress = {address}\nproject_id = "
            "{project_id}\nsecret_key = {secret_key}\ntimeout = {timeout}\n\n")

    return template.format(**section)


def load_config():
    with open("config.json") as f:
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
    config_parser = ConfigParser()
    with open('.centrc', 'r') as f:
        config_parser.readfp(f)
    config_parser.set('superuser', 'secret_key', config['api_secret'])
    with open('.centrc', 'w') as f:
        config_parser.write(f)


def generate_centrc(config):
    add_section(section_name='superuser',
                address='http://localhost:8000/api',
                project_id='_',
                secret_key=config['api_secret'])


def add_section(**section):
    with open('.centrc', 'a') as f:
        f.write(section_template(section))


def main():
    change_cwd_to_pkg_root()
    config = load_config()
    if not 'api_secret' in config:
        config['api_secret'] = generate_key()
    if not 'cookie_secret' in config:
        config['cookie_secret'] = generate_key()
    if not os.path.isfile('.centrc'):
        generate_centrc(config)
    else:
        update_centrc(config)
    write_config(config)
