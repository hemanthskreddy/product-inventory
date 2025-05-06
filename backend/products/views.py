from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

class ProductListView(APIView):
    """
    List all products, or create a new product.
    """
    def get(self, request):
        products = Product.objects.all()  # Fetch all products
        serializer = ProductSerializer(products, many=True)  # Serialize the data
        return Response(serializer.data)  # Return serialized data in response

    def post(self, request):
        serializer = ProductSerializer(data=request.data)  # Deserialize the data
        if serializer.is_valid():  # Check if the data is valid
            serializer.save()  # Save the product
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return created product
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # If validation fails

class ProductDetailView(APIView):
    """
    Retrieve, update, or delete a product.
    """
    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)  # Fetch the product by its primary key
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  # If the product is not found

        serializer = ProductSerializer(product)  # Serialize the product
        return Response(serializer.data)  # Return serialized data in response

    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)  # Fetch the product by its primary key
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  # If the product is not found

        serializer = ProductSerializer(product, data=request.data)  # Deserialize the data for update
        if serializer.is_valid():  # Check if the data is valid
            serializer.save()  # Save the updated product
            return Response(serializer.data)  # Return updated product
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # If validation fails

    def delete(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)  # Fetch the product by its primary key
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)  # If the product is not found

        product.delete()  # Delete the product
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return status to indicate deletion was successful
