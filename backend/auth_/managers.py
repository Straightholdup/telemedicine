from django.contrib.auth.models import (
    BaseUserManager
)


class MyUserManager(BaseUserManager):
    def create_user(self, email, date_of_birth, full_name, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            date_of_birth=date_of_birth,
            full_name=full_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, birth_date, full_name, password=None):
        user = self.create_user(
            email,
            password=password,
            date_of_birth=birth_date,
            full_name=full_name
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

    def create_doctor(self, email, date_of_birth, full_name, password=None, **doctor_info):
        from auth_.models import Doctor
        user = self.create_user(email, date_of_birth, full_name, password)
        doctor = Doctor(user=user, **doctor_info)
        doctor.save(using=self._db)
        return doctor
