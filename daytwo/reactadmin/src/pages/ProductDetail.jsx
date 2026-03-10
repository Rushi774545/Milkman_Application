import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { dairyProducts } from '../data/dairyData';
import { CartContext } from '../context/CartContext';
import { Star, ShoppingCart, Check, AlertCircle, Minus, Plus } from 'lucide-react';
import { getCategoryEmoji, getCategoryColor } from '../utils/emojiUtils';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/product/product/${id}/`);
                setProduct(res.data);
            } catch {
                // Fallback to local dairy data
                const p = dairyProducts.find((d) => String(d.id) === String(id));
                setProduct(p || null);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleAddToCart = (qty = quantity) => {
        addToCart(product, qty);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    if (loading) {
        return (
            <div className="py-5 text-center">
                <div className="loader"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="py-5 text-center">
                <AlertCircle size={60} style={{ color: 'var(--danger)', marginBottom: '20px' }} />
                <h3 style={{ fontWeight: '700', marginBottom: '10px' }}>Product not found</h3>
                <Link to="/products" className="btn btn-primary">Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="pb-5">
            {/* Breadcrumb */}
            <div style={{ marginBottom: '30px', fontSize: '14px' }}>
                <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
                {' / '}
                <Link to="/products" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Products</Link>
                {' / '}
                <span style={{ color: 'var(--text-secondary)' }}>{product.name}</span>
            </div>

            <div className="row g-4">
                {/* Product Image */}
                <div className="col-lg-5">
                    <div className="product-image-container" style={{ height: '500px' }}>
                        <div className="product-image" style={{ 
                             display: 'flex', 
                             alignItems: 'center', 
                             justifyContent: 'center', 
                             fontSize: '150px', 
                             height: '100%', 
                             background: getCategoryColor(product.category_name),
                             borderRadius: '24px' 
                         }}>
                              {getCategoryEmoji(product.category_name)}
                          </div>
                        <div className="product-rating" style={{ fontSize: '16px', padding: '8px 12px' }}>
                            <Star size={16} fill="white" /> 4.5 (248 reviews)
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="col-lg-7">
                    <div style={{ background: 'var(--card-bg)', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
                        {/* Title & Category */}
                        <h1 style={{ fontWeight: '700', marginBottom: '10px', fontSize: '32px' }}>
                            {product.name}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '20px' }}>
                            Category: <strong>{product.category_name || product.category}</strong>
                        </p>

                        {/* Rating & Reviews */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px', paddingBottom: '25px', borderBottom: '1px solid var(--border-color)' }}>
                            <div>
                                <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--success)' }}>4.5</span>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>★★★★☆</div>
                            </div>
                            <div>
                                <strong style={{ fontSize: '16px' }}>248 Verified Reviews</strong>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Highly rated by customers</p>
                            </div>
                        </div>

                        {/* Price */}
                        <div style={{ marginBottom: '25px' }}>
                            <h2 style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>
                                ₹{product.price}
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                ✓ Free delivery on orders above ₹500
                            </p>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div style={{ marginBottom: '25px', padding: '20px', background: 'var(--light-bg)', borderRadius: '8px' }}>
                                <h6 style={{ fontWeight: '700', marginBottom: '10px' }}>About this product</h6>
                                <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Benefits */}
                        <div style={{ marginBottom: '25px', padding: '20px', background: 'var(--light-bg)', borderRadius: '8px' }}>
                            <div style={{ marginBottom: '12px', fontSize: '14px' }}>
                                <Check size={16} style={{ display: 'inline', marginRight: '8px', color: 'var(--success)' }} />
                                ✓ 100% Fresh & Natural
                            </div>
                            <div style={{ marginBottom: '12px', fontSize: '14px' }}>
                                <Check size={16} style={{ display: 'inline', marginRight: '8px', color: 'var(--success)' }} />
                                ✓ Cold Storage Maintained
                            </div>
                            <div style={{ fontSize: '14px' }}>
                                <Check size={16} style={{ display: 'inline', marginRight: '8px', color: 'var(--success)' }} />
                                ✓ Home Delivery Available
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <span style={{ fontWeight: '700' }}>Quantity:</span>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'var(--light-bg)',
                                borderRadius: '8px',
                                padding: '6px',
                                width: 'fit-content'
                            }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="btn btn-sm"
                                    style={{ padding: '6px 12px', color: 'var(--primary)' }}
                                >
                                    <Minus size={18} />
                                </button>
                                <span style={{ fontWeight: '700', minWidth: '40px', textAlign: 'center', fontSize: '16px' }}>
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="btn btn-sm"
                                    style={{ padding: '6px 12px', color: 'var(--primary)' }}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => handleAddToCart()}
                                className="btn-add-cart"
                                style={{
                                    flex: 1,
                                    color: 'white',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    background: addedToCart ? 'var(--success)' : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                                }}
                            >
                                {addedToCart ? (
                                    <>
                                        <Check size={18} className="me-2" style={{ display: 'inline' }} />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={18} className="me-2" style={{ display: 'inline' }} />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                            <Link
                                to="/cart"
                                className="btn btn-buy"
                                style={{
                                    flex: 1,
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '16px',
                                    fontWeight: '600'
                                }}
                            >
                                Buy Now
                            </Link>
                        </div>

                        {/* Delivery Info */}
                        <div style={{ marginTop: '25px', padding: '20px', background: '#e8f5e9', borderLeft: '4px solid var(--success)', borderRadius: '4px' }}>
                            <strong style={{ color: 'var(--success)', fontSize: '16px' }}>✓ Delivery Tomorrow by 10 AM</strong>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                                Order now and get fresh products at your doorstep
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
