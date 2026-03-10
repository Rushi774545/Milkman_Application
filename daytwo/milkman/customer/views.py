from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Customer
from .serializers import CustomerSerializer
from staff.auth import StaffTokenAuthentication
from .auth import create_token

# Note: we will use customer token authentication in other parts of the project if needed
from .auth import CustomerTokenAuthentication
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class CustomerViewSet(APIView):
    # staff users may manage customers; public users should be able to register
    # authentication and permissions are decided dynamically
    def get_authenticators(self):
        # anyone may POST to create a new customer account
        if self.request.method == 'POST':
            return []
        # all other operations require staff token
        return [StaffTokenAuthentication()]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request, format=None):
        # only staff may call this, due to permissions above
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        # public registration endpoint
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        customer = Customer.objects.get(pk=pk)
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        customer = Customer.objects.get(pk=pk)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            customer = Customer.objects.get(email=email, password=password)
            token = create_token(customer)
            return Response({'token': token, 'customer_id': customer.id, 'email': customer.email, 'name': customer.name})
        except Customer.DoesNotExist:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
