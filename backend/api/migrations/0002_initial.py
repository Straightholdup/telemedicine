# Generated by Django 4.0.4 on 2022-05-28 08:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useranalysis',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='request',
            name='analysis',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.useranalysis'),
        ),
        migrations.AddField(
            model_name='request',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='doctor', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='request',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patient', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='request',
            name='status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.requeststatus'),
        ),
        migrations.AddField(
            model_name='doctorsymptom',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='doctorsymptom',
            name='symptom',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.symptom'),
        ),
        migrations.AddField(
            model_name='doctorspecialization',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='doctorspecialization',
            name='specialization',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.specialization'),
        ),
    ]
