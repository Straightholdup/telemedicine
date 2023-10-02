from rest_framework import mixins, viewsets, generics
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from api.models import DoctorSpecialization
from api.views import exception_decorator
from auth_.models import MainUser, Doctor
from auth_.serializers import (MainUserSerializer,
                               LoginSerializer, ChangePasswordSerializer,
                               ProfileSerializer, RegisterSerializer)
from auth_.token import generate_access_token


class UserViewSet(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = MainUser.objects.all()
    http_method_names = ['post', 'get', 'patch']
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == 'change_password':
            return ChangePasswordSerializer
        elif self.action == 'update':
            return ProfileSerializer
        return MainUserSerializer

    def get_serializer_context(self):
        return {'user': self.request.user}

    def get_object(self):
        if self.action == 'profile':
            return self.request.user
        return super().get_object()

    @action(methods=['post'], detail=False)
    def change_password(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.change()
        return Response({'user': MainUserSerializer(user).data})

    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token = generate_access_token(user)
        user_data = MainUserSerializer(user).data
        if user.is_doctor:
            spec = DoctorSpecialization.objects.get(doctor_id=user.id)
            doctor = Doctor.objects.get(user_id=user.id)
            user_data.update({'specialization': spec.specialization.name,
                              'price': doctor.price})
        return Response({'user': user_data,
                         'token': token})

    @action(methods=['get'], detail=False)
    def profile(self, request):
        user = self.get_object()
        return Response(MainUserSerializer(user).data)


# from .models import MyUser
# from .serializers import RegisterSerializer, UserSerializer
#
#
class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    authentication_classes = []

    @exception_decorator
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": MainUserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully",
        })

    def get_queryset(self):
        return MainUser.objects.all()

#
# class LoginView(APIView):
#     def post(self, request):
#         if 'email' not in request.data or 'password' not in request.data:
#             return Response({'msg': 'Credentials missing'}, status=status.HTTP_400_BAD_REQUEST)
#         email = request.POST['email']
#         password = request.POST['password']
#         user = authenticate(request, email=email, password=password)
#         if user is not None:
#             login(request, user)
#             auth_data = get_tokens_for_user(request.user)
#             return Response({'msg': 'Login Success', **auth_data}, status=status.HTTP_200_OK)
#         return Response({'msg': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
