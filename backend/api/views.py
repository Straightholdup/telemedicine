import time
from datetime import datetime
from decimal import Decimal

from django.forms import model_to_dict
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet

from api.authentication import SafeJWTAuthentication
from api.models import (Specialization, Symptom, AdultSymptoms, WomenSymptoms, ChildSymptoms, MenSymptoms,
                        DoctorSpecialization, Order, DoctorSchedule, DoctorSymptom, Request, RequestStatus)
from api.payment import Payment
from api.permissions import IsDoctor
from auth_.exceptions import BaseServiceException
from auth_.models import Doctor
from tools import tools


def exception_decorator(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except BaseServiceException as base_exc:
            return Response({'description': base_exc.description}, status=status.HTTP_409_CONFLICT)
        except Exception as err:
            print(err)
            exc_data = {'detail': str(err), 'traceback': str(err.__traceback__)}
            exc_data.update(err.__dict__)
            return Response(exc_data, status=status.HTTP_409_CONFLICT)

    return wrapper


class SpecializationView(APIView):
    permission_classes = [AllowAny]

    @exception_decorator
    def get(self, request, format=None):  # noqa
        specialization_list = [{'id': spec.id, 'type': spec.name} for spec in Specialization.objects.all()]
        return Response(specialization_list)


class SymptomViewSet(ViewSet):
    permission_classes = [AllowAny]

    @exception_decorator
    def list(self, request):
        _filter = request.query_params.get('filter', 'all')
        if _filter == 'all':
            queryset = [model_to_dict(model) for model in Symptom.objects.all()]
        elif _filter == 'adult':
            queryset = [model_to_dict(model.symptom) for model in AdultSymptoms.objects.all()]
        elif _filter == 'child':
            queryset = [model_to_dict(model.symptom) for model in ChildSymptoms.objects.all()]
        elif _filter == 'men':
            queryset = [model_to_dict(model.symptom) for model in MenSymptoms.objects.all()]
        elif _filter == 'women':
            queryset = [model_to_dict(model.symptom) for model in WomenSymptoms.objects.all()]
        else:
            queryset = [model_to_dict(model) for model in Symptom.objects.all()]
        return Response(queryset)

    @exception_decorator
    def retrieve(self, request, pk=None):
        ...


class DoctorViewSet(ViewSet):
    permission_classes = [AllowAny]

    @staticmethod
    def _get_doctor_data(doctor, specialization) -> dict:
        doctor_dict = {'id': doctor.id,
                       'full_name': doctor.user.full_name,
                       'imgSrc': doctor.user.avatar.url if doctor.user.avatar else None,
                       'grade': specialization.specialization.name,
                       'experience': doctor.total_experience,
                       'desc': doctor.description,
                       'price': doctor.price,
                       'duration': "30 минут"}
        return doctor_dict

    def list(self, request):
        specialization_id = request.query_params.get('specialization_id', None)
        symptom_id = request.query_params.get('symptom_id', None)
        answer = []
        if not specialization_id:
            if not symptom_id:
                doctors = Doctor.objects.all()
                for doctor in doctors:
                    specialization = DoctorSpecialization.objects.get(doctor=doctor.user)
                    doctor_dict = self._get_doctor_data(doctor, specialization)
                    answer.append(doctor_dict)
                return Response(answer)
            else:
                doctor_symptoms = DoctorSymptom.objects.filter(symptom_id=symptom_id)
                for doctor_symptom in doctor_symptoms:
                    doctor = Doctor.objects.get(user=doctor_symptom.doctor)
                    specialization = DoctorSpecialization.objects.get(doctor=doctor.user)
                    doctor_dict = self._get_doctor_data(doctor, specialization)
                    answer.append(doctor_dict)
                return Response(answer)

        else:
            doctor_specializations = DoctorSpecialization.objects.filter(specialization_id=specialization_id)
            for doctor_specialization in doctor_specializations:
                doctor = Doctor.objects.get(user=doctor_specialization.doctor)
                doctor_dict = self._get_doctor_data(doctor, doctor_specialization)
                answer.append(doctor_dict)
            return Response(answer)

    def retrieve(self, request, pk: int):  # noqa
        doctor = Doctor.objects.get(id=pk)
        return Response(model_to_dict(doctor))

    @action(methods=['post'], detail=False, permission_classes=[AllowAny])
    def get_time(self, request):
        doctor_id = request.data['doctor_id']
        date_ = request.data['date']
        if not doctor_id or not date_:
            raise TypeError('doctor_id and date are required')
        import datetime
        date_ = datetime.datetime.strptime(date_, '%Y-%m-%d')
        try:
            doctor = Doctor.objects.get(id=doctor_id)
        except Doctor.DoesNotExist:
            return Response({'status': 'ERROR', 'detail': 'Doctor does not exist'})
        available_times = DoctorSchedule.objects.filter(doctor_id=doctor.user.id, order_time__year=date_.year,
                                                        order_time__month=date_.month, order_time__day=date_.day)
        result = []
        for _time in available_times:
            if not _time.can_set:
                hour = str(_time.order_time.hour)
                minute = str(_time.order_time.minute)
                hour = hour if len(hour) > 1 else f"0{hour}"
                minute = minute if len(minute) > 1 else f"0{minute}"
                hour_minute = f"{hour}:{minute}"
                result.append({'time': hour_minute, 'id': _time.id})
        return Response({'status': 'Success', 'available_times': result})


class PaymentView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SafeJWTAuthentication]

    @exception_decorator
    def post(self, request, format=None):  # noqa
        amount = request.data['amount']
        request_id = request.data['request_id']
        if not amount or not request_id:
            raise TypeError('Amount and request_id are required')
        # patient = request.user
        amount = Decimal(amount).quantize(Decimal("0.00"))
        order = Order.objects.create(request_id=request_id, amount=float(amount))
        payment, code = Payment().run(order=str(order.id), amount=float(amount))
        return Response({'redirect_url': payment['payment_page_url'], 'order_id': order.id})


class RequestCreateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SafeJWTAuthentication]

    @exception_decorator
    def post(self, request, format=None):  # noqa
        doctor_id = request.data['doctor_id']
        schedule_id = request.data['schedule_id']
        if not doctor_id and not schedule_id:
            raise TypeError('request_id and doctor_id are required')
        patient = request.user
        try:
            doctor = Doctor.objects.get(id=doctor_id)
        except Doctor.DoesNotExist:
            return Response({'status': 'ERROR', 'detail': 'Doctor does not exist'})
        status_ = RequestStatus.objects.get(status='CREATED')
        doctor_schedule = DoctorSchedule.objects.get(id=schedule_id, doctor_id=doctor.user.id)
        request = Request.objects.create(doctor_id=doctor.user.id, patient=patient,
                                         status=status_, doctor_schedule=doctor_schedule)
        doctor_schedule.can_set = True
        doctor_schedule.save()
        return Response({'status': "SUCCESS", 'request_id': request.id})


class RequestListView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SafeJWTAuthentication]

    @exception_decorator
    def post(self, request, format=None):  # noqa
        time_ = request.query_params.get('time', None)
        user = request.user
        if time_:
            _requests = self._get_requests(user=user, _time=time_)
        else:
            _requests = self._get_requests(user=user)

        return Response({'request_list': _requests})

    @staticmethod
    def _get_requests(user, _time: str = None):
        _requests = []
        if user.is_doctor:
            requests = Request.objects.filter(doctor_id=user.id)
            if _time:
                if _time == 'future':
                    requests = Request.objects.filter(doctor_id=user.id, order__created_time__lt=datetime.now())
                elif _time == 'past':
                    requests = Request.objects.filter(doctor_id=user.id, order__created_time__gt=datetime.now())
            for _request in requests:
                # doctor = Doctor.objects.get(user_id=_request.doctor.id)
                order_time = _request.doctor_schedule.order_time
                order = Order.objects.get(request_id=_request.id)
                ans = {
                    'id': _request.id,
                    'name': _request.patient.full_name,
                    'price': int(order.amount),
                    'meeting_url': _request.meeting_url,
                    'order_time': str(order_time)
                }
                _requests.append(ans)
        else:
            requests = Request.objects.filter(patient_id=user.id)
            if _time:
                if _time == 'future':
                    requests = Request.objects.filter(patient_id=user.id, order__created_time__lt=datetime.now())
                elif _time == 'past':
                    requests = Request.objects.filter(patient_id=user.id, order__created_time__gt=datetime.now())
            for _request in requests:
                # doctor = Doctor.objects.get(user_id=_request.doctor.id)
                order_time = _request.doctor_schedule.order_time
                order = Order.objects.get(request_id=_request.id)
                ans = {
                    'id': _request.id,
                    'name': _request.patient.full_name,
                    'price': int(order.amount),
                    'meeting_url': _request.meeting_url,
                    'order_time': str(order_time)
                }
                _requests.append(ans)
        _requests.sort(key=lambda i: i['order_time'])
        return _requests


class VideoMeetingView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SafeJWTAuthentication]

    @exception_decorator
    def post(self, request, format=None):  # noqa
        zoom_client = tools.ZoomClient()
        meeting_url, meeting_pass = zoom_client.create_meeting()
        return Response({'meeting_url': meeting_url, 'meeting_pass': meeting_pass})


class SetPriceView(APIView):
    permission_classes = [IsDoctor]
    authentication_classes = [SafeJWTAuthentication]

    @exception_decorator
    def post(self, request, format=None):  # noqa
        price = request.data['price']
        user = request.user
        doctor = Doctor.objects.get(user_id=user.id)
        doctor.price = int(price)
        doctor.save()
        return Response({'status': 'SUCCESS'})


class PayBoxWebhookView(APIView):
    permission_classes = [AllowAny]

    @exception_decorator
    def post(self, request, format=None):  # noqa
        order_status = request.data['status']['code']
        if order_status == 'success':
            order_id = request.data['order']  # noqa
            order = Order.objects.get(id=int(order_id))
            order_email = request.data['options']['user']['email']
            order_phone = request.data['options']['user']['phone']
            order.order_id = order_id
            order.order_email = order_email
            order.order_phone = order_phone
            order.status = 'PAYED'
            order.save()
            zoom_client = tools.ZoomClient()
            meeting_url, meeting_pass = zoom_client.create_meeting()
            status_ = RequestStatus.objects.get(status='PAYED')
            request = Request.objects.get(id=order.request.id)
            request.status = status_
            request.meeting_url = meeting_url
            request.save()
        else:
            order_id = request.data['order']  # noqa
            order = Order.objects.get(id=int(order_id))
            order_email = request.data['options']['user']['email']
            order_phone = request.data['options']['user']['phone']
            order.order_id = order_id
            order.order_email = order_email
            order.order_phone = order_phone
            order.status = 'FAILED'
            order.save()
        return Response('ok')


class LongPoolView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SafeJWTAuthentication]

    @exception_decorator
    def post(self, request, format=None):  # noqa
        order_id = request.data['order_id']
        if not order_id:
            raise TypeError('Order_id is required')
        order = Order.objects.get(id=order_id)
        for i in range(30):
            order_ = Order.objects.get(id=order_id)
            if order_.status != order.status:
                return Response({'status': order_.status})
            time.sleep(1)
        return Response({'status': "PAYED"})


class DoctorScheduleView(APIView):
    permission_classes = [IsDoctor]
    authentication_classes = [SafeJWTAuthentication]

    @exception_decorator
    def post(self, request, format=None):  # noqa
        doctor = request.user
        schedule = request.data['schedule']
        days_of_week = {
            0: 'Monday',
            1: 'Tuesday',
            2: 'Wednesday',
            3: 'Thursday',
            4: 'Friday',
            5: 'Saturday',
            6: 'Sunday',
        }
        import datetime

        _day_of_week = datetime.date.today()
        _week_days = [v for k, v in days_of_week.items() if k >= _day_of_week.weekday()]
        _week_days.extend([v for k, v in days_of_week.items() if k < _day_of_week.weekday()])
        res = []
        for week_day in _week_days:
            for t in schedule:
                if t['day'] == week_day:
                    for item in t['items']:
                        if item['flag']:
                            start_hour = item['time'].split('-')[0]
                            res.append(str(_day_of_week) + ' ' + start_hour)
            else:
                _day_of_week = _day_of_week + datetime.timedelta(days=1)

        final = res.copy()
        for i in range(1, 11):
            for j in res:
                temp_date = datetime.datetime.strptime(j, '%Y-%m-%d %H:%M')
                temp_date = temp_date + datetime.timedelta(days=7 * i)
                final.append(temp_date)
        for time_ in final:
            DoctorSchedule.objects.create(doctor=doctor, order_time=time_)

        return Response({'status': 'SUCCESS'})


class GetDoctorAvailableDateView(APIView):
    permission_classes = [AllowAny]

    @exception_decorator
    def post(self, request, format=None):  # noqa
        doctor_id = request.data['doctor_id']
        date_ = request.data['date']
        if not doctor_id or not date_:
            raise TypeError('doctor_id and date are required')
        available_times = DoctorSchedule.objects.filter(doctor_id=doctor_id, order_time__year=date_.year,
                                                        order_time__month=date_.month, order_time__day=date_.day)
        print(available_times)
        return Response({'status': 'Success'})
