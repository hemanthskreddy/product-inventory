from django.contrib import admin
from django.urls import path, include  # Import 'include' here

# Home view function
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the Product Inventory API!")

urlpatterns = [
    path('', home, name='home'),  # Home route
    path('admin/', admin.site.urls),  # Admin route
    path('api/products/', include('products.urls')),  # API route for products
]
