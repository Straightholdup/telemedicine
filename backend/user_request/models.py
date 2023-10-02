from django.db import models

from api.models import UserAnalysis
from auth_.models import MyUser


class RequestStatus(models.Model):
    STATUSES = [
        (1, 'Created'),
        (2, 'Viewed'),
        (3, 'Answered'),
        (4, 'Canceled'),
    ]

    status = models.PositiveIntegerField(choices=STATUSES, blank=True, null=True, default=1)


class Request(models.Model):
    order_time = models.DateTimeField(auto_now_add=True, verbose_name="Создано")
    doctor_conclusion = models.TextField(verbose_name="")
    analysis = models.ForeignKey(UserAnalysis, on_delete=models.CASCADE)
    status = models.ForeignKey(to=RequestStatus, on_delete=models.CASCADE)
    patient = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    doctor = models.ForeignKey(MyUser, on_delete=models.CASCADE)
