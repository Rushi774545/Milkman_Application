import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Truck, Shield } from 'lucide-react';
import api from '../services/api';
import { dairyProducts, dairyCategories } from '../data/dairyData';
import { CartContext } from '../context/CartContext';
import { getCategoryEmoji, getCategoryColor } from '../utils/emojiUtils';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [productsRes, categoriesRes] = await Promise.all([
                api.get('/product/product/'),
                api.get('/category/category/')
            ]);
            setFeaturedProducts(productsRes.data.slice(0, 8));
            setCategories(categoriesRes.data);
        } catch {
            // Fallback to local dairy data for a smooth demo experience
            setFeaturedProducts(dairyProducts.slice(0, 8));
            setCategories(dairyCategories);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-5">
            {/* Hero Banner */}
            <div className="hero-banner mb-4">
                <div className="hero-content">
                    <h1 className="mb-3">Fresh Dairy Delivered Daily</h1>
                    <p className="mb-4">Get premium quality milk and dairy products delivered fresh to your doorstep</p>
                    <Link to="/products" className="btn btn-buy" style={{ fontSize: '18px', padding: '12px 30px', width: 'auto' }}>
                        <ShoppingCart size={20} className="me-2" style={{ display: 'inline' }} />
                        Shop Now
                    </Link>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="container mb-5">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <Truck size={40} style={{ color: 'var(--primary)', marginBottom: '15px' }} />
                            <h5 style={{ fontWeight: '700', marginBottom: '8px' }}>Fast Delivery</h5>
                            <p style={{ color: 'var(--text-secondary)' }}>Get fresh products delivered within 24 hours</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <Shield size={40} style={{ color: 'var(--primary)', marginBottom: '15px' }} />
                            <h5 style={{ fontWeight: '700', marginBottom: '8px' }}>100% Fresh</h5>
                            <p style={{ color: 'var(--text-secondary)' }}>All products are fresh and quality checked</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <Star size={40} style={{ color: 'var(--primary)', marginBottom: '15px' }} />
                            <h5 style={{ fontWeight: '700', marginBottom: '8px' }}>Best Prices</h5>
                            <p style={{ color: 'var(--text-secondary)' }}>Guaranteed lowest prices on dairy products</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="container mb-5">
                <div className="mb-4">
                    <h2 style={{ fontWeight: '700', marginBottom: '10px' }}>Shop by Category</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Browse through our wide range of dairy products</p>
                </div>
                <div className="row g-3">
                    {categories.slice(0, 6).map((category) => (
                        <div key={category.id} className="col-6 col-md-4 col-lg-2">
                            <Link to={`/products?category=${category.id}`} style={{ textDecoration: 'none' }}>
                                <div className="category-card">
                                    <div className="category-image" style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        fontSize: '70px', 
                                        height: '180px', 
                                        background: getCategoryColor(category.name),
                                        borderRadius: '16px',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        {getCategoryEmoji(category.name)}
                                    </div>
                                    <div className="category-name">{category.name}</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            <div className="container mb-5">
                <div className="mb-4">
                    <h2 style={{ fontWeight: '700', marginBottom: '10px' }}>Featured Products</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Check out our most popular items</p>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div className="products-grid">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <div className="product-image-container" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                                    <div className="product-image" style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        fontSize: '80px', 
                                        height: '250px', 
                                        background: getCategoryColor(product.category_name),
                                        transition: 'transform 0.5s ease'
                                    }}>
                                        {getCategoryEmoji(product.category_name)}
                                    </div>
                                    <div className="product-rating">
                                        <Star size={14} fill="white" /> 4.5
                                    </div>
                                </div>
                                <div className="product-info">
                                    <h5 className="product-title">{product.name}</h5>
                                    <p className="product-category">{product.category_name}</p>
                                    <div style={{ marginBottom: '15px' }}>
                                        <span className="product-price">₹{product.price}</span>
                                    </div>
                                    <Link 
                                        to={`/products/${product.id}`} 
                                        className="btn btn-primary"
                                        style={{ marginTop: '10px', display: 'block' }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-5">
                    <Link to="/products" className="btn btn-primary" style={{ padding: '12px 40px', fontSize: '16px' }}>
                        View All Products
                    </Link>
                </div>
            </div>

            {/* Newsletter */}
            <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', color: 'white', padding: '60px 20px', textAlign: 'center', marginTop: '40px' }}>
                <h3 style={{ fontWeight: '700', marginBottom: '15px' }}>Stay Updated</h3>
                <p style={{ marginBottom: '30px', opacity: '0.95' }}>Subscribe to get exclusive offers and fresh product updates</p>
                <form style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', gap: '10px' }}>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        style={{ flex: 1, padding: '12px 15px', border: 'none', borderRadius: '8px' }}
                        required
                    />
                    <button type="submit" className="btn btn-buy">Subscribe</button>
                </form>
            </div>
        </div>
    );
};

export default Home;
