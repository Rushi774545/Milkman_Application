from django.db import models

class Provider(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    phone = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    
    # Store information like milk farm name or "Sold By" name
    store_name = models.CharField(max_length=100, default="Local Dairy")

    def __str__(self):
        return f"{self.store_name} ({self.name})"
    
    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False
