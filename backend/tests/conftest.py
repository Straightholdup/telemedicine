import os

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "telemedecine.settings")
django.setup()
