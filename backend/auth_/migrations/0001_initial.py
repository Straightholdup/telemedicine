# Generated by Django 4.0.4 on 2022-05-28 08:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import utils.file_utils


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='MainUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('full_name', models.CharField(blank=True, max_length=300, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatars/', validators=[utils.file_utils.validate_image_size])),
                ('email', models.EmailField(db_index=True, max_length=50, unique=True)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_doctor', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('education', models.JSONField(verbose_name='Образование')),
                ('experience', models.JSONField(verbose_name='Места работы')),
                ('description', models.TextField(verbose_name='Описание доктора')),
                ('total_experience', models.IntegerField(verbose_name='Общий опыт')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_doctor', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Доктор',
                'verbose_name_plural': 'Доктора',
            },
        ),
    ]