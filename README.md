# Milk Project - Dairy Delivery System

A comprehensive dairy product management and delivery system featuring a Django REST Framework backend and a modern React (Vite) frontend with a sleek Black & Blue theme.

## 🚀 Project Overview

The Milk Project is designed to streamline the process of ordering and managing dairy products. It includes features for customers to browse products, subscribe to regular deliveries, and for staff/admins to manage inventory and orders.

### Key Features
- **Customer Portal**: Browse dairy categories, view product details, and manage orders.
- **Subscription System**: Recurring delivery management for dairy essentials.
- **Staff/Admin Panel**: Inventory management, product tracking, and order fulfillment.
- **Modern UI**: Dark-themed (Black & Blue) responsive interface built with React.
- **RESTful API**: Robust backend built with Django REST Framework.

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 6.0.2
- **API**: Django REST Framework
- **Database**: SQLite3
- **Tools**: `sqlparse`, `corsheaders`, `requests`

### Frontend
- **Framework**: React (Vite)
- **Styling**: CSS3 (Custom Black & Blue Theme)
- **State Management**: React Context API (Cart, Auth)
- **Icons/Visuals**: Emoji-based UI enhancements

## 📂 Project Structure

```text
Milk_Project/
├── daytwo/
│   ├── milkman/        # Django Backend
│   │   ├── category/   # Category Management
│   │   ├── customer/   # Customer Management & Auth
│   │   ├── product/    # Product Inventory
│   │   └── subscription/ # Delivery Subscriptions
│   ├── reactadmin/     # React Frontend (Vite)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── context/
│   └── backend/        # Legacy/Alternative Node.js Server (if applicable)
└── ...
```

## ⚙️ Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd daytwo/milkman
   ```
2. Activate the virtual environment:
   ```bash
   ..\env\Scripts\activate
   ```
3. Run migrations:
   ```bash
   python manage.py migrate
   ```
4. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd daytwo/reactadmin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🎨 UI Theme
The project features a custom **Black & Blue** dark theme defined in `reactadmin/src/App.css`.
- **Background**: `#0a0a0a` (Deep Black)
- **Primary Color**: `#007bff` (Vibrant Blue)
- **Accent**: `#00d4ff` (Cyan Blue)
- **Text**: `#ffffff` (White)

## 📄 Documentation
- [Frontend Improvements](daytwo/FRONTEND_IMPROVEMENTS.md)
- [Image Upload Guide](daytwo/IMAGE_UPLOAD_GUIDE.md)
- [Testing Guide](daytwo/TESTING_GUIDE.md)
