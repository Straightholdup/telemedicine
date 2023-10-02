from django.db import models

from auth_.models import MainUser
from tools.generate_file_name import get_file_path


class Symptom(models.Model):
    name = models.CharField(verbose_name="Название симптома", max_length=500)

    class Meta:
        verbose_name = 'Симптом'
        verbose_name_plural = 'Симптомы'

    def __str__(self):
        return self.name


class Specialization(models.Model):
    name = models.CharField(verbose_name="Название специализации", max_length=255)
    description = models.TextField(verbose_name="Описание специализации")

    class Meta:
        verbose_name = 'Специализация'
        verbose_name_plural = 'Специализации'

    def __str__(self):
        return f"{self.name}"


class AdultSymptoms(models.Model):
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE, related_name='adult_symptom')

    class Meta:
        verbose_name = 'Симптом для взрослых'
        verbose_name_plural = 'Симптомы для взрослых'

    def __str__(self):
        return self.symptom.name


class ChildSymptoms(models.Model):
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE, related_name='child_symptom')

    class Meta:
        verbose_name = 'Симптом для детей'
        verbose_name_plural = 'Симптомы для детей'

    def __str__(self):
        return self.symptom.name


class MenSymptoms(models.Model):
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE, related_name='men_symptom')

    class Meta:
        verbose_name = 'Симптом для мужчин'
        verbose_name_plural = 'Симптомы для мужчин'

    def __str__(self):
        return self.symptom.name


class WomenSymptoms(models.Model):
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE, related_name='women_symptom')

    class Meta:
        verbose_name = 'Симптом для женщин'
        verbose_name_plural = 'Симптомы для женщин'

    def __str__(self):
        return self.symptom.name


class DoctorSymptom(models.Model):
    doctor = models.ForeignKey(MainUser, on_delete=models.CASCADE)
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE)


class DoctorSpecialization(models.Model):
    doctor = models.ForeignKey(MainUser, on_delete=models.CASCADE)
    specialization = models.ForeignKey(Specialization, on_delete=models.CASCADE)


class DoctorSchedule(models.Model):
    doctor = models.ForeignKey(MainUser, on_delete=models.CASCADE)
    order_time = models.DateTimeField()
    can_set = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Расписание доктора'
        verbose_name_plural = 'Расписании доктора'

    def __str__(self):
        return self.doctor.full_name


class UserAnalysis(models.Model):
    path = models.FileField(upload_to=get_file_path)
    user = models.ForeignKey(MainUser, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, verbose_name="Добавлено")

    class Meta:
        verbose_name = 'Анализ пользователя'
        verbose_name_plural = 'Анализы пользователя'

    def __str__(self):
        return f"{self.user.full_name}"


class RequestStatus(models.Model):
    """
    Created, Payed, Canceled
    """
    status = models.CharField(max_length=255)

    def __str__(self):
        return self.status


class Request(models.Model):
    order_time = models.DateTimeField(auto_now_add=True)
    doctor_conclusion = models.TextField(null=True)
    conclusion_time = models.DateTimeField(null=True)
    description = models.TextField(null=True)
    analysis = models.ForeignKey(UserAnalysis, on_delete=models.CASCADE, null=True)
    patient = models.ForeignKey(MainUser, on_delete=models.CASCADE, related_name='patient')
    doctor = models.ForeignKey(MainUser, on_delete=models.CASCADE, related_name='doctor')
    status = models.ForeignKey(RequestStatus, on_delete=models.CASCADE)
    doctor_schedule = models.ForeignKey(DoctorSchedule, on_delete=models.CASCADE)
    meeting_url = models.CharField(max_length=255, null=True)


class Order(models.Model):
    request = models.ForeignKey(Request, on_delete=models.CASCADE)
    amount = models.FloatField()
    order_id = models.CharField(max_length=255, null=True)
    order_email = models.CharField(max_length=255, null=True)
    order_phone = models.CharField(max_length=255, null=True)
    created_time = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=255, default='CREATED')
