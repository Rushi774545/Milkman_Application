import os
import requests
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from product.models import Product
import urllib.parse


class Command(BaseCommand):
    help = 'Download and assign images to products'

    def handle(self, *args, **options):
        # Image URLs mapped to products
        image_mapping = {
            'Fresh Whole Milk 1L': 'https://images.unsplash.com/photo-1517248135467-4d71bcdd2d59?w=500&h=500&fit=crop',
            'Toned Milk 1L': 'https://images.unsplash.com/photo-1488195269916-be7491210149?w=500&h=500&fit=crop',
            'Double Toned Milk 1L': 'https://images.unsplash.com/photo-1536223082149-8eb93d71aa82?w=500&h=500&fit=crop',
            'Organic Full Cream Milk 1L': 'https://images.unsplash.com/photo-1518611229143-55821f8f929f?w=500&h=500&fit=crop',
            'Plain Yogurt 500ml': 'https://images.unsplash.com/photo-1488477181946-6428a0291840?w=500&h=500&fit=crop',
            'Mango Yogurt 500ml': 'https://images.unsplash.com/photo-1563245265-b47f4e65e5ab?w=500&h=500&fit=crop',
            'Strawberry Yogurt 500ml': 'https://images.unsplash.com/photo-1488677146867-eb726f61ce44?w=500&h=500&fit=crop',
            'Greek Yogurt 400ml': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
            'Mozzarella Cheese 200g': 'https://images.unsplash.com/photo-1628185286851-3c74f6f3e234?w=500&h=500&fit=crop',
            'Cheddar Cheese Slices 200g': 'https://images.unsplash.com/photo-1634487360203-074f3a24359f?w=500&h=500&fit=crop',
            'Feta Cheese 250g': 'https://images.unsplash.com/photo-1452512925148-ce2e76319338?w=500&h=500&fit=crop',
            'Parmesan Cheese 100g': 'https://images.unsplash.com/photo-1511981715890-5b964be824b8?w=500&h=500&fit=crop',
            'Fresh Butter 100g': 'https://images.unsplash.com/photo-1589985643862-16055ee40b4a?w=500&h=500&fit=crop',
            'Salted Butter 200g': 'https://images.unsplash.com/photo-1627995314123-456e6f6cc92a?w=500&h=500&fit=crop',
            'Unsalted Butter 200g': 'https://images.unsplash.com/photo-1570735260733-e75565e54910?w=500&h=500&fit=crop',
            'Organic Grass-fed Butter 100g': 'https://images.unsplash.com/photo-1615485276933-aa21815c9c13?w=500&h=500&fit=crop',
            'Fresh Paneer 500g': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd94b79?w=500&h=500&fit=crop',
            'Low Fat Paneer 500g': 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500&h=500&fit=crop',
            'Smoked Paneer 250g': 'https://images.unsplash.com/photo-1618164436241-4473940571ce?w=500&h=500&fit=crop',
            'Cottage Cheese 400g': 'https://images.unsplash.com/photo-1577599810694-e7ce7d8d4e3e?w=500&h=500&fit=crop',
            'Pure Ghee 500ml': 'https://images.unsplash.com/photo-1586985289688-cacf84cf4f1d?w=500&h=500&fit=crop',
            'Organic A2 Ghee 250ml': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd94b79?w=500&h=500&fit=crop',
            'Cow Ghee 1L': 'https://images.unsplash.com/photo-1628185286851-3c74f6f3e234?w=500&h=500&fit=crop',
            'Bilona Ghee 500ml': 'https://images.unsplash.com/photo-1627995314123-456e6f6cc92a?w=500&h=500&fit=crop',
        }

        for product_name, image_url in image_mapping.items():
            try:
                product = Product.objects.get(name=product_name)
                
                # Download image
                response = requests.get(image_url, timeout=10)
                if response.status_code == 200:
                    # Generate filename from URL to avoid duplicates
                    filename = f"{product_name.replace(' ', '_')}.jpg"
                    product.image.save(filename, ContentFile(response.content), save=True)
                    self.stdout.write(self.style.SUCCESS(f'✅ Downloaded image for: {product_name}'))
                else:
                    self.stdout.write(self.style.WARNING(f'⚠️  Failed to download: {product_name}'))
            except Product.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'❌ Product not found: {product_name}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'❌ Error with {product_name}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS('\n✅ Image download complete!'))
