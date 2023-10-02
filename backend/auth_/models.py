from datetime import date

from django.contrib.auth.models import (
    AbstractBaseUser
)
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser,
                                        PermissionsMixin)
from django.db import models

from utils import file_utils


# class MyUser(AbstractBaseUser):
#     ADMIN = 1
#     CLIENT = 2
#     DOCTOR = 3
#
#     ROLE_CHOICES = (
#         (ADMIN, 'Admin'),
#         (CLIENT, 'Client'),
#         (DOCTOR, 'Doctor'),
#     )
#     email = models.EmailField(
#         verbose_name='email address',
#         max_length=255,
#         unique=True,
#     )
#     date_of_birth = models.DateField()
#     full_name = models.CharField(max_length=255)
#     photo = models.ImageField(upload_to="images/", null=True, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)
#     role = models.PositiveIntegerField(choices=ROLE_CHOICES, blank=True, null=True, default=1)
#     objects = MyUserManager()
#
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['date_of_birth', 'full_name']
#
#     def __str__(self):
#         return self.email
#
#     def has_perm(self, perm, obj=None):  # noqa
#         return True
#
#     def has_module_perms(self, app_label):  # noqa
#         return True
#
#     @property
#     def is_staff(self):
#         return self.is_admin
#
#     @property
#     def is_doctor(self):
#         return self.role == Doctor


class MainUserManager(BaseUserManager):
    """
    Main user manager
    """

    def create_user(self, email, password, full_name: str, birth_date: date, phone: str = None):
        """
        Creates and saves a user with the given email.
        """
        if not email or not full_name or not birth_date:
            raise ValueError('User must have a email, full_name, birth_date')
        user = self.model(email=email, password=password,
                          full_name=full_name, birth_date=birth_date, phone=phone)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, birth_date, full_name, password=None):
        """
        Creates and saves a superuser with the given email and password
        """
        user = self.model(email=email)
        user.set_password(password)
        user.birth_date = birth_date
        user.full_name = full_name
        user.is_admin = True
        user.is_superuser = True
        user.is_moderator = True
        user.is_staff = True
        user.save(using=self._db)
        return user

    def create_doctor(self, email, date_of_birth, full_name, phone, password=None, **doctor_info):
        user = self.create_user(email=email, birth_date=date_of_birth,
                                full_name=full_name, password=password, phone=phone)
        doctor = Doctor(user=user, **doctor_info)
        doctor.save(using=self._db)
        user.is_doctor = True
        user.save()
        return doctor


class MainUser(AbstractBaseUser, PermissionsMixin):
    """
    MainUser it's my custom user
    """
    full_name = models.CharField(max_length=300, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True,
                               validators=[file_utils.validate_image_size])
    email = models.EmailField(max_length=50, unique=True, db_index=True)
    # role = models.PositiveIntegerField(choices=ROLE_CHOICES, blank=True, null=True, default=1)
    birth_date = models.DateField(blank=True, null=True)
    phone = models.CharField(max_length=255, default="87080000000")
    timestamp = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_doctor = models.BooleanField(default=False)
    objects = MainUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'birth_date']

    def __str__(self):
        return '{}: {}'.format(self.full_name, self.email)


class Doctor(models.Model):
    user = models.OneToOneField(MainUser, on_delete=models.CASCADE, related_name='user_doctor')
    education = models.JSONField(verbose_name="Образование")
    experience = models.JSONField(verbose_name="Места работы")
    description = models.TextField(verbose_name="Описание доктора")
    total_experience = models.IntegerField(verbose_name="Общий опыт")
    grade = models.CharField(max_length=255, verbose_name="Направление", null=True, blank=True)
    price = models.IntegerField(default=5000)

    class Meta:
        verbose_name = 'Доктор'
        verbose_name_plural = 'Доктора'

    def __str__(self):
        return f"{self.user.full_name}: {self.user.email}"
