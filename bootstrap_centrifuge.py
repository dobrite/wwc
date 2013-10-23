"""
$ bin/cent --config .centrc superuser project_create --params='{"name":
"test2"}'
{'method': 'project_create', 'uid': None, 'error': None, 'body':
['5267cdcaa4dd5f2114a7d7fb', 'test2', '', '', 5, 100, 5000,
'f0a03438e6c4493a8b8a42fd7d3d6e7e', None], 'params': None}

526... is project id
f0a... is secret key
"""

#first we need to generate or insert a cookie_secret and api_secret into config.json
#then generate .centrc w/ [superuser], [test], and [wwc] sections
#then that api_secret is used for project_secret_key below

from cent.core import Client


def section_template(section_name, address, project_id, secret_key, timeout=5):
    template = "\n[{section_name}]\naddress = {address}\nproject_id =
            {project_id}\nsecret_key = {secret_key}\ntimeout = {timeout}\n"

    return template.format(
        section_name=section_name,
        address=address,
        project_id=project_id,
        secret_key=secret_key,
        timeout=timeout,
    )



client = Client("http://localhost:8000/api", "_", "project_secret_key")
result, error = client.send(
    "publish", {
        "namespace": "python",
        "channel": "django",
        "data": "hello world"
    }
)

#for project id: uuid.uuid4()
#for secret key: import os; os.random(24)
