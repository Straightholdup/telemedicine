# Generated by Django 4.0.4 on 2022-06-07 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_doctorschedule_schedule_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctorschedule',
            name='can_set',
            field=models.BooleanField(default=False),
        ),
    ]
