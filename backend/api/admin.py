from django.contrib import admin

from api.models import (Specialization, Symptom, AdultSymptoms, MenSymptoms,
                        ChildSymptoms, WomenSymptoms, DoctorSymptom, RequestStatus, Request)

admin.site.register(Specialization)
admin.site.register(Symptom)
admin.site.register(AdultSymptoms)
admin.site.register(MenSymptoms)
admin.site.register(ChildSymptoms)
admin.site.register(WomenSymptoms)
admin.site.register(DoctorSymptom)
admin.site.register(Request)
admin.site.register(RequestStatus)
