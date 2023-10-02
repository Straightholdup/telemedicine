from api.data_models.doctor import User, Doctor


class TestUser:
    def test_user_init(self):
        user = User(email="test@email.com",
                    full_name="test full name",
                    photo="test_photo",
                    user_type="client")
        assert isinstance(user, User)
        assert user.id is None
        assert user.email == 'test@email.com'
        assert user.full_name == 'test full name'
        assert user.photo == 'test_photo'
        assert user.user_type == 'client'

    def test_doctor_init(self, user):
        doctor = Doctor(user=user, education={
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
        assert doctor.user == user
        assert doctor.education == {
            '2018-09 2022-05': {'place': 'Kazakh-British Technical University',
                                'title': 'Computer Systems and Software'}
        }
        assert doctor.experience == {
            '2020-03 2021-01': "Northwest",  # 10 month
            '2021-02 2021-04': "Sberbank",  # 2 month
            '2021-04 2022-05': "Qasco.kz",  # 1 year 1 month
            '2021-10 2022-05': "G-2 Division",  # 6 month
        }
        assert doctor.description == 'Some description'

    def test_doctor_calculate_total_experience(self, doctor):
        assert doctor.amount_experience == 3

    def test_doctor_calculate_total_experience_when_exp_none(self, user):
        doctor = Doctor(user=user, education={
            '2018-09 2022-05': {'place': 'Kazakh-British Technical University',
                                'title': 'Computer Systems and Software'}
        },
                        experience={},
                        description="Some description")
        assert doctor.amount_experience == 0

    def test_doctor_calculate_total_experience_with_amount_less_than_one(self, user):
        doctor = Doctor(user=user, education={
            '2018-09 2022-05': {'place': 'Kazakh-British Technical University',
                                'title': 'Computer Systems and Software'}
        },
                        experience={
                            '2021-04 2022-05': "Qasco.kz",  # 1 year 1 month
                        },
                        description="Some description")
        assert doctor.amount_experience == 1

    def test_doctor_calculate_total_experience_with_amount_less_than_6_month(self, user):
        doctor = Doctor(user=user, education={
            '2018-09 2022-05': {'place': 'Kazakh-British Technical University',
                                'title': 'Computer Systems and Software'}
        },
                        experience={
                            '2022-01 2022-05': "Qasco.kz",  # 1 year 1 month
                        },
                        description="Some description")
        assert doctor.amount_experience == 0
