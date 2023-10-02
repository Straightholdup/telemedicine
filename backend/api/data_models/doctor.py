import datetime
import typing

import attr


@attr.s(auto_attribs=True, frozen=True)
class User:
    email: str
    full_name: str
    photo: str = None
    user_type: str = None
    id: int = None


@attr.s(auto_attribs=True, frozen=True)
class Symptom:
    name: str
    id: int = None


@attr.s(auto_attribs=True, frozen=True)
class Specialization:
    name: str
    description: str
    id: int = None


@attr.s(auto_attribs=True)
class Doctor:
    education: dict
    experience: dict
    description: str
    user: User
    symptoms: typing.List[Symptom] = None
    specializations: typing.List[Specialization] = None
    price: int = None
    id: int = None

    @property
    def amount_experience(self) -> float:
        amount: int = 0
        if not self.experience:
            return amount
        for dates, _ in self.experience.items():
            dates_list = dates.split(' ')
            from_date = datetime.datetime.strptime(dates_list[0], '%Y-%m')
            to_date = datetime.datetime.strptime(dates_list[1], '%Y-%m')
            amount += (to_date - from_date).days
        return round(amount / 365)
