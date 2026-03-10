import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'milkman.settings')
django.setup()

from product.models import Product

Product.objects.all().delete()
print("✅ All products deleted successfully!")
