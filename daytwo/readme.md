# Milkman Project

This workspace contains a Django REST API backend (`milkman` app) and a React frontend (`reactadmin` folder) for a dairy e-commerce system. The frontend supports both staff (admin) and customer workflows.

## Backend (Django)

### Setup

1. Create and activate a Python virtual environment under `daytwo/env` or similar.
2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
   (if `requirements.txt` isn't present, install manually: `django djangorestframework django-cors-headers`)
3. Apply database migrations:
   ```powershell
   python milkman/manage.py migrate
   ```
4. (Optional) Create a superuser for the Django admin:
   ```powershell
   python milkman/manage.py createsuperuser
   ```
5. Run the development server:
   ```powershell
   python milkman/manage.py runserver 8000
   ```

The API is available at `http://localhost:8000/`. The following endpoints are exposed:

- `POST /staff/login/` – staff authentication
- `POST /customer/login/` – customer authentication
- CRUD endpoints for `/staff/`, `/customer/`, `/category/`, `/product/` and `/subscription/`

CORS is enabled for all origins, so the React app can access the API during development.

## Frontend (React)

The React app lives in `daytwo/reactadmin` and was bootstrapped with Vite + React.

### Setup

1. Change into the frontend folder:
   ```powershell
   cd daytwo/reactadmin
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```

The app will open at `http://localhost:5173` (default Vite port). By default it expects the API at `http://localhost:8000`.

### Features

- **Staff**: login and manage staff, customers, categories, products, subscriptions
- **Customer**: register/login, browse products, add to cart, checkout, view order history
- Responsive, Bootstrap-styled UI with image-rich product listings and checkout flow

## Notes

- Customer orders are represented by the `Subscription` model internally.
- API tokens are simple signed payloads; tokens expire after 24 hours.

Feel free to extend the project with additional fields, real authentication, or payment integration.
