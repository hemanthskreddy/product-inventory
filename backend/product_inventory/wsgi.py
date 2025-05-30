"""
WSGI config for product_inventory project.

It exposes the WSGI callable as a module-level variable named `application`.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/ref/django-admin/#runserver
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'product_inventory.settings')

application = get_wsgi_application()
