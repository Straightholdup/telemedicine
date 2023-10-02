# from django.contrib.auth.models import User

# from .models import MyUser
import logging

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from api.data_models.doctor import User, Doctor
from api.models import DoctorSpecialization, DoctorSymptom
from auth_.exceptions import DoctorInformationDoesNotFull
from auth_.models import MainUser

logger = logging.getLogger(__name__)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainUser
        fields = ('id', 'full_name', 'avatar', 'birth_date')


class MainUserSerializer(ProfileSerializer):
    class Meta(ProfileSerializer.Meta):
        fields = ProfileSerializer.Meta.fields + ('email', 'timestamp', 'is_doctor', 'phone')


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=200)
    full_name = serializers.CharField(max_length=300, allow_null=True)

    def complete(self, activation):
        user = MainUser.objects.create_user(self.validated_data['email'],
                                            self.validated_data['password'],
                                            self.validated_data['full_name'])
        activation.is_active = False
        activation.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        try:
            user = MainUser.objects.get(email=attrs['email'])
        except MainUser.DoesNotExist:
            raise ValidationError("User does not exists")
        if not attrs['password'] == user.password:
            raise ValidationError("User does not exists")
        attrs['user'] = user
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    password1 = serializers.CharField()
    password2 = serializers.CharField()

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise ValidationError("PASSWORDS ARE NOT SAME")
        return attrs

    def change(self):
        user = self.context['user']
        user.set_password(self.validated_data['password1'])
        user.save()
        return user


# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    education = serializers.JSONField(required=False)
    experience = serializers.JSONField(required=False)
    description = serializers.CharField(required=False)
    specialization_id = serializers.IntegerField(required=False)
    symptom_ids = serializers.ListField(child=serializers.IntegerField(), required=False)
    price = serializers.IntegerField(required=False, default=5000)

    class Meta:
        model = MainUser
        fields = ('id', 'email', 'password', 'full_name', 'birth_date', 'phone',
                  'education', 'experience', 'description', 'is_doctor', 'specialization_id', 'price', 'symptom_ids')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        """
        For creation by user role
        :param validated_data:
        :return:
        """
        if validated_data['is_doctor']:
            if not validated_data.get('education') or not validated_data.get('experience') or not validated_data.get(
                    'description') or not validated_data.get('specialization_id') \
                    or not validated_data.get('symptom_ids'):
                raise DoctorInformationDoesNotFull()
            user = User(email=validated_data['email'], full_name=validated_data['full_name'])
            doctor = Doctor(education=validated_data['education'],
                            experience=validated_data['experience'],
                            description=validated_data['description'],
                            user=user)
            user = MainUser.objects.create_doctor(email=user.email,
                                                  password=validated_data['password'],
                                                  full_name=user.full_name,
                                                  date_of_birth=validated_data['birth_date'],
                                                  phone=validated_data['phone'],
                                                  education=doctor.education,
                                                  experience=doctor.experience,
                                                  description=doctor.description,
                                                  total_experience=doctor.amount_experience).user
            _ = DoctorSpecialization.objects.create(doctor=user,
                                                    specialization_id=validated_data.get('specialization_id'))
            for symptom_id in validated_data.get('symptom_ids'):
                _ = DoctorSymptom.objects.create(doctor=user, symptom_id=symptom_id)

        else:
            user = MainUser.objects.create_user(email=validated_data['email'],
                                                password=validated_data['password'],
                                                full_name=validated_data['full_name'],
                                                birth_date=validated_data['birth_date'],
                                                phone=validated_data['phone'])
        return user
#
#
# # User serializer
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = MyUser
#         fields = '__all__'
