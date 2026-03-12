import React, { useState, useEffect, useContext } from 'react';
 import api from '../services/api';
 import { dairyProducts, dairyCategories } from '../data/dairyData';
import { CartContext } from '../context/CartContext';
import { getCategoryEmoji, getCategoryColor } from '../utils/emojiUtils';
import { Link, useSearchParams } from 'react-router-dom';
import { Star, ShoppingCart, Filter, ChevronDown } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        filterAndSortProducts();
    }, [products, selectedCategory, sortBy, priceRange, searchParams]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [productsRes, categoriesRes] = await Promise.all([
                api.get('/product/product/'),
                api.get('/category/category/')
            ]);
            setProducts(productsRes.data);
            setCategories(categoriesRes.data);
        } catch {
            // Fallback to local dairy data for a smooth demo experience
            setProducts(dairyProducts);
            setCategories(dairyCategories);
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortProducts = () => {
        let filtered = [...products];
        
        // Category filter
        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === parseInt(selectedCategory));
        }

        // Price filter
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Search filter
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Sort
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    };

    return (
        <div className="pb-5">
            {/* Page Header */}
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontWeight: '700', marginBottom: '10px' }}>Our Products</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Browse our selection of fresh dairy products • {filteredProducts.length} products
                </p>
            </div>

            <div className="row g-4">
                {/* Sidebar Filters */}
                <div className="col-lg-3">
                    <button 
                        className="btn w-100 mb-3"
                        onClick={() => setShowFilters(!showFilters)}
                        style={{ 
                            background: 'var(--primary)', 
                            color: 'white',
                            borderRadius: '8px',
                            padding: '10px',
                            fontWeight: '600'
                        }}
                    >
                        <Filter size={18} className="me-2" style={{ display: 'inline' }} />
                        Filters {showFilters ? '−' : '+'}
                    </button>

                    {showFilters && (
                        <div className="filter-section">
                            {/* Category Filter */}
                            <div className="mb-4">
                                <h6 style={{ fontWeight: '700', marginBottom: '12px' }}>Category</h6>
                                <select 
                                    className="form-select"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-4">
                                <h6 style={{ fontWeight: '700', marginBottom: '12px' }}>Price Range</h6>
                                <div className="mb-3">
                                    <input 
                                        type="range" 
                                        className="form-range"
                                        min="0" 
                                        max="10000" 
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    />
                                </div>
                                <small>₹{priceRange[0]} - ₹{priceRange[1]}</small>
                            </div>

                            {/* Clear Filters */}
                            <button 
                                className="btn btn-outline-secondary w-100"
                                onClick={() => {
                                    setSelectedCategory('');
                                    setPriceRange([0, 10000]);
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="col-lg-9">
                    {/* Sort Bar */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px', gap: '15px' }}>
                        <div>
                            <label style={{ fontSize: '14px', fontWeight: '600', marginRight: '10px' }}>Sort by:</label>
                            <select 
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ width: 'auto', display: 'inline-block', minWidth: '150px' }}
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="loader"></div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <ShoppingCart size={60} style={{ color: 'var(--text-secondary)', marginBottom: '20px', opacity: '0.5' }} />
                            <h4 style={{ fontWeight: '600', marginBottom: '10px' }}>No products found</h4>
                            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your filters or search terms</p>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {filteredProducts.map(product => (
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
                                        {Math.random() > 0.7 && (
                                            <div className="product-discount">20% OFF</div>
                                        )}
                                    </div>
                                    <div className="product-info">
                                        <h5 className="product-title">{product.name}</h5>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <p className="product-category mb-0">{product.category_name}</p>
                                            <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '600' }}>
                                                {product.provider_store_name || 'Local Dairy'}
                                            </span>
                                        </div>
                                        {product.description && (
                                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: '1.4' }}>
                                                {product.description.substring(0, 60)}...
                                            </p>
                                        )}
                                        <div style={{ marginBottom: '15px' }}>
                                            <span className="product-price">₹{product.price}</span>
                                        </div>
                                        <button 
                                            className="btn btn-primary w-100"
                                            onClick={() => addToCart(product)}
                                        >
                                            <ShoppingCart size={18} />
                                            Add to Cart
                                        </button>
                                        <Link 
                                            to={`/products/${product.id}`} 
                                            className="btn btn-outline-secondary w-100 mt-3"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
