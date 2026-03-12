from django.urls import path
from .views import ProviderLoginView, ProviderOrderView, ProviderRegisterView

urlpatterns = [
    path('login/', ProviderLoginView.as_view(), name='provider-login'),
    path('register/', ProviderRegisterView.as_view(), name='provider-register'),
    path('orders/', ProviderOrderView.as_view(), name='provider-orders'),
    path('orders/<int:pk>/', ProviderOrderView.as_view(), name='provider-order-detail'),
]
