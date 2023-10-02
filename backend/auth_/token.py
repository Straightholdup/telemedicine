import datetime

import jwt
from django.conf import settings
from rest_framework_jwt.settings import api_settings


def get_token(user):
    """
    :param user:
    :return: token which generates automatically using JWT
    """
    jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
    payload = jwt_payload_handler(user)
    payload['id'] = payload['user_id']
    token = jwt_encode_handler(payload)
    return token


def generate_access_token(user):
    access_token_payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
    }
    access_token = jwt.encode(access_token_payload,
                              settings.SECRET_KEY, algorithm='HS256').decode('utf-8')
    return access_token
