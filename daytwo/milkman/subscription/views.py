from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Subscription
from .serializers import SubscriptionSerializer
from staff.auth import StaffTokenAuthentication
from customer.auth import CustomerTokenAuthentication
from customer.models import Customer


# subscriptions can be created by customers (orders) or managed by staff


class SubscriptionViewSet(APIView):
    # allow customer tokens for POST and staff for all methods
    def get_authenticators(self):
        if self.request.method == 'POST':
            return [CustomerTokenAuthentication(), StaffTokenAuthentication()]
        return [StaffTokenAuthentication()]

    def get_permissions(self):
        # POST requires some authenticated user (customer or staff)
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        # GET/PUT/DELETE only available to staff
        return [IsAuthenticated()]

    def get(self, request, format=None):
        # if customer is calling, return only their subscriptions
        if isinstance(request.user, Customer):
            subscriptions = Subscription.objects.filter(customer=request.user)
        else:
            subscriptions = Subscription.objects.all()
        serializer = SubscriptionSerializer(subscriptions, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data.copy()
        # If the caller is a Customer, force the customer field from the token and save via kwarg
        if isinstance(request.user, Customer):
            serializer = SubscriptionSerializer(data=data)
            if serializer.is_valid():
                subscription = serializer.save(customer=request.user)
                out = SubscriptionSerializer(subscription)
                return Response(out.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # Staff can create by providing customer in payload
        serializer = SubscriptionSerializer(data=data)
        if serializer.is_valid():
            subscription = serializer.save()
            out = SubscriptionSerializer(subscription)
            return Response(out.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk, format=None):
        subscription = Subscription.objects.get(pk=pk)
        serializer = SubscriptionSerializer(subscription, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        subscription = Subscription.objects.get(pk=pk)
        subscription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
