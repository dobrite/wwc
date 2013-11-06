import hmac

from random import choice
from random import randint

from itertools import repeat


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


with open('words.txt') as f:
    WORDS = f.read().split("\n")
def generate_username():
    """
    Create a random username
    """
    times = 2 if randint(0, 9) else 3
    words = [choice(WORDS) for _ in range(times)]
    return "-".join(words)
