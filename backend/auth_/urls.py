from django.urls import path
from rest_framework.routers import DefaultRouter

from auth_ import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
]
router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='users')
urlpatterns += router.urls

# from django.urls import path
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
#
# from auth_.views import RegisterView, LoginView
#
# urlpatterns = [
#     path('token/', LoginView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('register/', RegisterView.as_view(), name='token_refresh'),
# ]
