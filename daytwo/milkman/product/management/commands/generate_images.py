import os
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from product.models import Product
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO


class Command(BaseCommand):
    help = 'Generate and assign placeholder images to products'

    def create_placeholder_image(self, product_name, category_name):
        """Create a placeholder image with product info"""
        # Create a new image with gradient colors
        width, height = 500, 500
        
        # Category colors
        colors = {
            'Milk': {'bg': (230, 240, 255), 'edge': (100, 150, 255)},
            'Yogurt': {'bg': (255, 240, 200), 'edge': (255, 180, 0)},
            'Cheese': {'bg': (255, 250, 200), 'edge': (255, 200, 0)},
            'Butter': {'bg': (255, 240, 220), 'edge': (255, 200, 100)},
            'Paneer': {'bg': (240, 255, 240), 'edge': (100, 200, 100)},
            'Ghee': {'bg': (255, 220, 180), 'edge': (200, 120, 0)},
        }
        
        color_set = colors.get(category_name, {'bg': (230, 230, 230), 'edge': (100, 100, 100)})
        
        # Create image
        img = Image.new('RGB', (width, height), color_set['bg'])
        draw = ImageDraw.Draw(img)
        
        # Draw border
        border_width = 3
        draw.rectangle(
            [(border_width, border_width), (width - border_width, height - border_width)],
            outline=color_set['edge'],
            width=border_width
        )
        
        # Add emoji/icon based on category
        icons = {
            'Milk': '🥛',
            'Yogurt': '🥤',
            'Cheese': '🧀',
            'Butter': '💛',
            'Paneer': '⬜',
            'Ghee': '✨',
        }
        
        icon = icons.get(category_name, '📦')
        
        # Add product info text
        try:
            # Try to use default font, if not available use basic
            font = ImageFont.load_default()
        except:
            font = None
        
        # Draw icon at center
        bbox = draw.textbbox((0, 0), icon)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        icon_x = (width - text_width) // 2
        icon_y = (height - 200) // 2
        draw.text((icon_x, icon_y), icon, fill='black', font=font)
        
        # Draw product name (split into lines if too long)
        name_lines = self.wrap_text(product_name, 20)
        y_offset = height - 120
        for line in name_lines:
            bbox = draw.textbbox((0, 0), line)
            text_width = bbox[2] - bbox[0]
            x = (width - text_width) // 2
            draw.text((x, y_offset), line, fill='black', font=font)
            y_offset += 25
        
        # Save to BytesIO
        img_io = BytesIO()
        img.save(img_io, 'JPEG', quality=90)
        img_io.seek(0)
        return img_io

    def wrap_text(self, text, max_chars):
        """Wrap text to fit max characters per line"""
        words = text.split()
        lines = []
        current_line = []
        current_length = 0
        
        for word in words:
            if current_length + len(word) + 1 <= max_chars:
                current_line.append(word)
                current_length += len(word) + 1
            else:
                if current_line:
                    lines.append(' '.join(current_line))
                current_line = [word]
                current_length = len(word)
        
        if current_line:
            lines.append(' '.join(current_line))
        
        return lines

    def handle(self, *args, **options):
        products = Product.objects.filter(image__exact='')
        
        if not products.exists():
            products = Product.objects.all()
        
        for product in products:
            try:
                # Generate placeholder image
                img_io = self.create_placeholder_image(product.name, product.category.name)
                filename = f"{product.category.name}_{product.id}.jpg"
                product.image.save(filename, ContentFile(img_io.read()), save=True)
                self.stdout.write(self.style.SUCCESS(f'✅ Created image for: {product.name}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'❌ Error with {product.name}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS('\n✅ Image generation complete!'))
