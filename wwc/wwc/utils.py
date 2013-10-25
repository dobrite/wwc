import hmac


def get_client_token(secret_key, project_id, user):
    """
    Create token to validate information provided by new connection.
    """
    sign = hmac.new(str(secret_key))
    sign.update(str(user))
    sign.update(str(project_id))
    token = sign.hexdigest()
    return token
