from typing import Tuple, Optional, Any
from django.core import signing
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
from .models import Customer

SALT = "customer-auth"
TOKEN_MAX_AGE = 60 * 60 * 24


def create_token(customer: Customer) -> str:
    payload = {"id": customer.pk, "email": customer.email}
    return signing.dumps(payload, salt=SALT)


def verify_token(token: str) -> Optional[dict]:
    try:
        return signing.loads(token, salt=SALT, max_age=TOKEN_MAX_AGE)
    except (signing.SignatureExpired, signing.BadSignature):
        return None


class CustomerTokenAuthentication(BaseAuthentication):
    def authenticate(self, request) -> Optional[Tuple[Customer, dict]]:
        auth = request.headers.get("Authorization")
        if not auth:
            return None
        parts = auth.split()
        if len(parts) != 2 or parts[0].lower() != "token":
            return None
        payload: Optional[dict[str, Any]] = verify_token(parts[1])
        if payload is None:
            return None
        try:
            customer = Customer.objects.get(pk=payload.get("id"))
        except Customer.DoesNotExist:
            return None
        return customer, payload
