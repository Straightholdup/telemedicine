from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.views import (SpecializationView, SymptomViewSet, DoctorViewSet, PayBoxWebhookView,
                       PaymentView, VideoMeetingView, DoctorScheduleView, RequestCreateView,
                       LongPoolView, RequestListView, SetPriceView)

router = DefaultRouter()
router.register('symptoms', SymptomViewSet, basename='symptoms')
router.register('doctor', DoctorViewSet, basename='doctor')
urlpatterns = [
    path('specializations/', SpecializationView.as_view()),
    path('', include(router.urls)),
    path('payments/webhook/', PayBoxWebhookView.as_view()),
    path('payments/', PaymentView.as_view()),
    path('payments/long-pool/', LongPoolView.as_view()),
    path('meeting/', VideoMeetingView.as_view()),
    path('schedule/doctor/', DoctorScheduleView.as_view()),
    path('request/create/', RequestCreateView.as_view()),
    path('request/list/', RequestListView.as_view()),
    path('set-price/', SetPriceView.as_view()),

]
