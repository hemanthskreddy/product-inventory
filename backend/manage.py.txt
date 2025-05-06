import os
import sys

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'product_inventory.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError:
        # If Django is not installed, we raise an ImportError with a helpful message.
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable?"
        )
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
