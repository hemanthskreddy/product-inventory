from django.urls import path
from . import views  # import views from the same folder

urlpatterns = [
    path('', views.ProductListView.as_view(), name='product-list'),  # URL for listing and creating products
    path('<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),  # URL for retrieving, updating, and deleting a specific product
]
