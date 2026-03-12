import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import Staff from './pages/Staff';
import Customer from './pages/Customer';
import Category from './pages/Category';
import Product from './pages/Product';
import Subscription from './pages/Subscription';

// customer-facing pages
import Home from './pages/Home';
import CustomerLogin from './pages/CustomerLogin';
import CustomerRegister from './pages/CustomerRegister';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';
import MilkmanLogin from './pages/MilkmanLogin';
import MilkmanRegister from './pages/MilkmanRegister';
import MilkmanDashboard from './pages/MilkmanDashboard';

import { CartProvider } from './context/CartContext';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('staffToken');
    return isLoggedIn ? children : <Navigate to="/login" />;
};

const CustomerRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('customerToken');
    return isLoggedIn ? children : <Navigate to="/customer-login" />;
};

const ProviderRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('providerToken');
    return isLoggedIn ? children : <Navigate to="/milkman-login" />;
};

function App() {
    return (
        <Router>
            <CartProvider>
                <Layout>
                    <Routes>
                        {/* staff/admin routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/staff" element={<PrivateRoute><Staff /></PrivateRoute>} />
                        <Route path="/customer" element={<PrivateRoute><Customer /></PrivateRoute>} />
                        <Route path="/category" element={<PrivateRoute><Category /></PrivateRoute>} />
                        <Route path="/product" element={<PrivateRoute><Product /></PrivateRoute>} />
                        <Route path="/subscription" element={<PrivateRoute><Subscription /></PrivateRoute>} />
                        
                        {/* milkman/provider routes */}
                        <Route path="/milkman-login" element={<MilkmanLogin />} />
                        <Route path="/milkman-register" element={<MilkmanRegister />} />
                        <Route path="/milkman-dashboard" element={<ProviderRoute><MilkmanDashboard /></ProviderRoute>} />

                        {/* public/customer-facing pages */}
                        <Route path="/" element={localStorage.getItem('staffToken') ? <Navigate to="/staff" /> : <Home />} />
                        <Route path="/customer-login" element={<CustomerLogin />} />
                        <Route path="/register" element={<CustomerRegister />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/orders" element={<CustomerRoute><OrderHistory /></CustomerRoute>} />
                        <Route path="/order-history" element={<CustomerRoute><OrderHistory /></CustomerRoute>} />
                        <Route path="/checkout" element={<CustomerRoute><Checkout /></CustomerRoute>} />
                        <Route path="/success" element={<OrderSuccess />} />
                    </Routes>
                </Layout>
            </CartProvider>
        </Router>
    );
}

export default App;
