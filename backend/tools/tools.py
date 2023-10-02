import json
from time import time

import jwt
import requests


class ZoomClient:
    def __init__(self):
        self.API_KEY = 'luaX4QUjR1ai6LDw_iqnag'
        self.API_SEC = 'pNygIG4i88C7qG8EVcyXsbSOV1Ls7cLRxsdq'
        self._meeting_settings()

    def generate_token(self):
        token = jwt.encode(
            {'iss': self.API_KEY, 'exp': time() + 5000}, self.API_SEC,
            algorithm='HS256'
        )
        token = token.decode('utf-8') if isinstance(token, bytes) else token
        return token

    def _meeting_settings(self):
        self._meeting_details = {"topic": "The title of your zoom meeting",
                                 "type": 2,
                                 "start_time": "2019-06-14T10: 21: 57",
                                 "duration": "45",
                                 "timezone": "Europe/Madrid",
                                 "agenda": "test",

                                 "recurrence": {"type": 1,
                                                "repeat_interval": 1
                                                },
                                 "settings": {"host_video": "true",
                                              "participant_video": "true",
                                              "join_before_host": "true",
                                              "mute_upon_entry": "False",
                                              "watermark": "true",
                                              "audio": "voip",
                                              "auto_recording": "cloud",
                                              "waiting_room": "False",
                                              }
                                 }

    def create_meeting(self):
        headers = {'authorization': 'Bearer ' + self.generate_token(),
                   'content-type': 'application/json'}
        r = requests.post(
            f'https://api.zoom.us/v2/users/me/meetings',
            headers=headers, data=json.dumps(self._meeting_details))
        y = json.loads(r.text)
        join_url = y["join_url"]
        meeting_password = y["password"]
        return join_url, meeting_password


if __name__ == '__main__':
    zoom_client = ZoomClient()
    join_url, meeting_password = zoom_client.create_meeting()
    print(join_url, meeting_password)
