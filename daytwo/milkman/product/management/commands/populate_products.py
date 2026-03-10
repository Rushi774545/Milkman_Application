from django.core.management.base import BaseCommand
from category.models import Category
from product.models import Product


class Command(BaseCommand):
    help = 'Populate database with dairy products'

    def handle(self, *args, **options):
        # Create Categories
        categories_data = [
            {'name': 'Milk', 'description': 'Fresh dairy milk'},
            {'name': 'Yogurt', 'description': 'Creamy yogurt products'},
            {'name': 'Cheese', 'description': 'Various cheese types'},
            {'name': 'Butter', 'description': 'Fresh butter variants'},
            {'name': 'Paneer', 'description': 'Fresh paneer products'},
            {'name': 'Ghee', 'description': 'Pure clarified butter'},
        ]

        categories = {}
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description'], 'is_active': True}
            )
            categories[cat_data['name']] = cat
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created category: {cat_data["name"]}'))

        # Create Products
        products_data = [
            # Milk Products
            {'name': 'Fresh Whole Milk 1L', 'category': 'Milk', 'price': 45.00, 'description': '100% pure whole milk, enriched with calcium and vitamin D', 'image_url': 'https://images.unsplash.com/photo-1517248135467-4d71bcdd2d59?w=500&h=500&fit=crop'},
            {'name': 'Toned Milk 1L', 'category': 'Milk', 'price': 35.00, 'description': 'Toned milk with reduced fat content, perfect for daily consumption', 'image_url': 'https://images.unsplash.com/photo-1488195269916-be7491210149?w=500&h=500&fit=crop'},
            {'name': 'Double Toned Milk 1L', 'category': 'Milk', 'price': 32.00, 'description': 'Low fat toned milk, ideal for health-conscious families', 'image_url': 'https://images.unsplash.com/photo-1536223082149-8eb93d71aa82?w=500&h=500&fit=crop'},
            {'name': 'Organic Full Cream Milk 1L', 'category': 'Milk', 'price': 65.00, 'description': 'Certified organic full cream milk from grass-fed cows', 'image_url': 'https://images.unsplash.com/photo-1518611229143-55821f8f929f?w=500&h=500&fit=crop'},

            # Yogurt Products
            {'name': 'Plain Yogurt 500ml', 'category': 'Yogurt', 'price': 40.00, 'description': 'Thick and creamy plain yogurt with live cultures', 'image_url': 'https://images.unsplash.com/photo-1488477181946-6428a0291840?w=500&h=500&fit=crop'},
            {'name': 'Mango Yogurt 500ml', 'category': 'Yogurt', 'price': 45.00, 'description': 'Delicious mango flavored yogurt with real fruit', 'image_url': 'https://images.unsplash.com/photo-1563245265-b47f4e65e5ab?w=500&h=500&fit=crop'},
            {'name': 'Strawberry Yogurt 500ml', 'category': 'Yogurt', 'price': 45.00, 'description': 'Fresh strawberry flavored yogurt with natural color', 'image_url': 'https://images.unsplash.com/photo-1488688066340-e7f51f24d01c?w=500&h=500&fit=crop'},
            {'name': 'Greek Yogurt 400ml', 'category': 'Yogurt', 'price': 95.00, 'description': 'Premium Greek yogurt, thick and protein-rich', 'image_url': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop'},

            # Cheese Products
            {'name': 'Mozzarella Cheese 200g', 'category': 'Cheese', 'price': 180.00, 'description': 'Soft mozzarella cheese perfect for pizzas and pastas', 'image_url': 'https://images.unsplash.com/photo-1628185286851-3c74f6f3e234?w=500&h=500&fit=crop'},
            {'name': 'Cheddar Cheese Slices 200g', 'category': 'Cheese', 'price': 200.00, 'description': 'Premium cheddar cheese slices for sandwiches', 'image_url': 'https://images.unsplash.com/photo-1634487360203-074f3a24359f?w=500&h=500&fit=crop'},
            {'name': 'Feta Cheese 250g', 'category': 'Cheese', 'price': 220.00, 'description': 'Crumbly feta cheese, perfect for salads', 'image_url': 'https://images.unsplash.com/photo-1452512925148-ce2e76319338?w=500&h=500&fit=crop'},
            {'name': 'Parmesan Cheese 100g', 'category': 'Cheese', 'price': 150.00, 'description': 'Aged parmesan cheese for authentic Italian taste', 'image_url': 'https://images.unsplash.com/photo-1511981715890-5b964be824b8?w=500&h=500&fit=crop'},

            # Butter Products
            {'name': 'Fresh Butter 100g', 'category': 'Butter', 'price': 60.00, 'description': 'Freshly churned butter with no added preservatives', 'image_url': 'https://images.unsplash.com/photo-1589985643862-16055ee40b4a?w=500&h=500&fit=crop'},
            {'name': 'Salted Butter 200g', 'category': 'Butter', 'price': 110.00, 'description': 'Premium salted butter for pastries and cooking', 'image_url': 'https://images.unsplash.com/photo-1627995314123-456e6f6cc92a?w=500&h=500&fit=crop'},
            {'name': 'Unsalted Butter 200g', 'category': 'Butter', 'price': 120.00, 'description': 'Pure unsalted butter, perfect for baking', 'image_url': 'https://images.unsplash.com/photo-1570735260733-e75565e54910?w=500&h=500&fit=crop'},
            {'name': 'Organic Grass-fed Butter 100g', 'category': 'Butter', 'price': 150.00, 'description': 'Organic butter from grass-fed cows', 'image_url': 'https://images.unsplash.com/photo-1615485276933-aa21815c9c13?w=500&h=500&fit=crop'},

            # Paneer Products
            {'name': 'Fresh Paneer 500g', 'category': 'Paneer', 'price': 200.00, 'description': 'Soft and fresh homemade paneer, perfect for curries', 'image_url': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd94b79?w=500&h=500&fit=crop'},
            {'name': 'Low Fat Paneer 500g', 'category': 'Paneer', 'price': 190.00, 'description': 'Low fat paneer for health-conscious cooking', 'image_url': 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500&h=500&fit=crop'},
            {'name': 'Smoked Paneer 250g', 'category': 'Paneer', 'price': 250.00, 'description': 'Delicious smoked paneer with unique flavor', 'image_url': 'https://images.unsplash.com/photo-1618164436241-4473940571ce?w=500&h=500&fit=crop'},
            {'name': 'Cottage Cheese 400g', 'category': 'Paneer', 'price': 160.00, 'description': 'Creamy cottage cheese for dishes and salads', 'image_url': 'https://images.unsplash.com/photo-1577599810694-e7ce7d8d4e3e?w=500&h=500&fit=crop'},

            # Ghee Products
            {'name': 'Pure Ghee 500ml', 'category': 'Ghee', 'price': 450.00, 'description': 'Pure clarified butter ghee, no additives', 'image_url': 'https://images.unsplash.com/photo-1586985289688-cacf84cf4f1d?w=500&h=500&fit=crop'},
            {'name': 'Organic A2 Ghee 250ml', 'category': 'Ghee', 'price': 380.00, 'description': 'Organic A2 ghee from desi cow milk', 'image_url': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd94b79?w=500&h=500&fit=crop'},
            {'name': 'Cow Ghee 1L', 'category': 'Ghee', 'price': 850.00, 'description': 'Premium cow ghee for cooking and rituals', 'image_url': 'https://images.unsplash.com/photo-1628185286851-3c74f6f3e234?w=500&h=500&fit=crop'},
            {'name': 'Bilona Ghee 500ml', 'category': 'Ghee', 'price': 650.00, 'description': 'Traditional bilona ghee, made the ancient way', 'image_url': 'https://images.unsplash.com/photo-1627995314123-456e6f6cc92a?w=500&h=500&fit=crop'},
        ]

        for prod_data in products_data:
            product, created = Product.objects.get_or_create(
                name=prod_data['name'],
                defaults={
                    'category': categories[prod_data['category']],
                    'price': prod_data['price'],
                    'description': prod_data['description'],
                    'is_active': True
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created product: {prod_data["name"]}'))

        self.stdout.write(self.style.SUCCESS('Successfully populated all products and categories!'))
