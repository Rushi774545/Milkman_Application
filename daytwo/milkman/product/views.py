from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Product
from .serializers import ProductSerializer
from staff.auth import StaffTokenAuthentication

class ProductViewSet(APIView):
    # open GET requests to everyone, other methods require staff
    def get_authenticators(self):
        if self.request.method == 'GET':
            return []
        return [StaffTokenAuthentication()]

    def get_permissions(self):
        if self.request.method == 'GET':
            return []  # AllowAny
        return [IsAuthenticated()]

    def get(self, request, pk=None, format=None):
        if pk is not None:
            product = get_object_or_404(Product, pk=pk)
            serializer = ProductSerializer(product, context={'request': request})
            return Response(serializer.data)
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        product = Product.objects.get(pk=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
