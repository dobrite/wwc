import os
import hmac
import pkg_resources

from random import choice
from random import randint


pkgroot = pkg_resources.get_distribution('wwc').location
words_path = os.path.join(pkgroot, 'wwc', 'data', 'words.txt')
with open(words_path) as f:
    WORDS = f.read().split("\n")


def get_client_token(secret_key, project_id, user, user_info=None):
    """
    Create token to validate information provided by new connection.
    """
    sign = hmac.new(bytes(secret_key, 'utf-8'))
    sign.update(bytes(project_id, 'utf-8'))
    sign.update(bytes(user, 'utf-8'))
    if user_info:
        sign.update(bytes(user_info, 'utf-8'))
    token = sign.hexdigest()
    return token


def generate_username():
    """
    Create a random username
    """
    times = 2 if randint(0, 9) else 3
    words = [choice(WORDS) for _ in range(times)]
    return "-".join(words)
