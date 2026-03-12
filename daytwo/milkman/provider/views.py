from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Provider
from .serializers import ProviderSerializer
from .auth import create_token, ProviderTokenAuthentication
from subscription.models import Subscription
from subscription.serializers import SubscriptionSerializer
from rest_framework.permissions import IsAuthenticated, BasePermission, AllowAny

class IsProvider(BasePermission):
    def has_permission(self, request, view):
        return isinstance(request.user, Provider) and request.user.is_authenticated

class ProviderRegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = ProviderSerializer(data=request.data)
        if serializer.is_valid():
            # In a real app, use password hashing. For this project, keeping it simple as per existing pattern.
            provider = serializer.save()
            token = create_token(provider)
            return Response({
                'token': token,
                'user': ProviderSerializer(provider).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProviderLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            provider = Provider.objects.get(email=email, password=password)
            token = create_token(provider)
            return Response({
                'token': token,
                'user': ProviderSerializer(provider).data
            })
        except Provider.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class ProviderOrderView(APIView):
    authentication_classes = [ProviderTokenAuthentication]
    permission_classes = [IsProvider]

    def get(self, request):
        # Only get subscriptions for products belonging to this provider
        orders = Subscription.objects.filter(product__provider=request.user).order_by('-start_date')
        serializer = SubscriptionSerializer(orders, many=True)
        return Response(serializer.data)

    def patch(self, request, pk):
        # Allow provider to toggle order status (if there's a status field, for now just is_active)
        try:
            order = Subscription.objects.get(pk=pk, product__provider=request.user)
            order.is_active = request.data.get('is_active', order.is_active)
            order.save()
            return Response(SubscriptionSerializer(order).data)
        except Subscription.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
