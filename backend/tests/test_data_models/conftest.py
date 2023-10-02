import pytest

from api.data_models.doctor import User, Doctor


@pytest.fixture
def user():
    return User(email="test@email.com",
                full_name="test full name",
                photo="test_photo",
                user_type="client")


@pytest.fixture
def doctor(user):
    return Doctor(user=user, education={
        '2018-09 2022-05': {'place': 'Kazakh-British Technical University',
                            'title': 'Computer Systems and Software'}
    },
                  experience={
                      '2020-03 2021-01': "Northwest",
                      '2021-02 2021-04': "Sberbank",
                      '2021-04 2022-05': "Qasco.kz",
                      '2021-10 2022-05': "G-2 Division",
                  },
                  description="Some description")
