# Generated by Django 4.0.4 on 2022-06-05 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth_', '0002_doctor_grade'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctor',
            name='price',
            field=models.IntegerField(default=5000),
            preserve_default=False,
        ),
    ]