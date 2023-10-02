import uuid
from datetime import datetime, timedelta

import requests
from django.conf import settings


class Payment:

    def __init__(self):
        self.DATE_FORMAT = '%Y-%m-%d %H:%M:%S'
        self.LOGIN = settings.PAYBOX_ID
        self.PASSWORD = settings.PAYBOX_PASS
        self.URL = settings.PAYBOX_URL
        self.CURRENCY = "KZT"
        self.DESCRIPTION = 'Пополнение личного кабинета'
        self.EXPIRES_AT = self.get_expires_at()
        self.CONTENT_TYPE = "application/json"

    def get_expires_at(self):
        return (datetime.now() + timedelta(hours=1)).strftime(self.DATE_FORMAT)

    def _http_basic_auth(self):
        from base64 import b64encode
        auth_credentials = "%s:%s" % (self.LOGIN, self.PASSWORD)
        token = b64encode(auth_credentials.encode()).decode()
        return "Basic %s" % token

    def get_body(self, order, amount):
        data = {
            "order": order,
            "amount": amount,
            "currency": self.CURRENCY,
            "description": self.DESCRIPTION,
            "expires_at": self.EXPIRES_AT,
        }
        return data

    def get_header(self):
        headers = {
            "content-type": "application/json",
            "X-Idempotency-Key": str(uuid.uuid4()),
            "Authorization": self._http_basic_auth()
        }
        return headers

    def run(self, order, amount):
        import json
        body = self.get_body(order, amount)
        headers = self.get_header()
        r = requests.post(self.URL, data=json.dumps(body), headers=headers)
        return r.json(), r.status_code


if __name__ == '__main__':
    payment = Payment()
    order_id = uuid.uuid4().hex
    content, code = payment.run(order=order_id, amount=5000)
    print(content, code)
