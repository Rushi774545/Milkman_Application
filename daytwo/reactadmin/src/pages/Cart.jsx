import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { getCategoryEmoji, getCategoryColor } from '../utils/emojiUtils';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, total } = useContext(CartContext);
    const hasCustomerToken = localStorage.getItem('customerToken');

    if (cart.length === 0) {
        return (
            <div className="pb-5">
                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                    <ShoppingCart size={80} style={{ color: 'var(--text-secondary)', marginBottom: '20px', opacity: '0.3' }} />
                    <h2 style={{ fontWeight: '700', marginBottom: '15px' }}>Your cart is empty</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '16px' }}>
                        Add some fresh dairy products to your cart and get them delivered today!
                    </p>
                    <Link to="/products" className="btn btn-primary" style={{ padding: '12px 40px', fontSize: '16px' }}>
                        <ArrowLeft size={18} className="me-2" style={{ display: 'inline' }} />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-5">
            {/* Page Header */}
            <div style={{ marginBottom: '30px' }}>
                <Link to="/products" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
                    <ArrowLeft size={16} className="me-1" style={{ display: 'inline' }} />
                    Continue Shopping
                </Link>
                <h1 style={{ fontWeight: '700', marginTop: '15px' }}>Shopping Cart</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {cart.length} item{cart.length > 1 ? 's' : ''} in your cart
                </p>
            </div>

            {/* Login Alert */}
            {!hasCustomerToken && (
                <div style={{ 
                    background: 'linear-gradient(135deg, #ffe66d 0%, #ffd550 100%)',
                    padding: '15px 20px',
                    borderRadius: '8px',
                    marginBottom: '25px'
                }}>
                    <p style={{ margin: '0', fontWeight: '600' }}>
                        ⚠️ Please <Link to="/customer-login" style={{ color: 'var(--primary)', fontWeight: '700' }}>log in</Link> to complete your purchase
                    </p>
                </div>
            )}

            <div className="row g-4">
                {/* Cart Items */}
                <div className="col-lg-8">
                    <div className="cart-items-container">
                        {cart.map((item, index) => (
                            <div key={`${item.id}-${index}`} className="cart-item">
                                <div className="row g-3 align-items-center">
                                    {/* Product Image */}
                                    <div className="col-3 col-md-2">
                                        <div className="product-image" style={{ 
                                                  width: '100%', 
                                                  height: '100px', 
                                                  display: 'flex', 
                                                  alignItems: 'center', 
                                                  justifyContent: 'center', 
                                                  fontSize: '40px', 
                                                  background: getCategoryColor(item.category_name),
                                                  borderRadius: '12px' 
                                              }}>
                                                  {getCategoryEmoji(item.category_name)}
                                              </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="col-9 col-md-4">
                                        <h6 style={{ fontWeight: '700', marginBottom: '5px' }}>{item.name}</h6>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>
                                            {item.category_name}
                                        </p>
                                        <p style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '16px' }}>
                                            ₹{item.price}
                                        </p>
                                    </div>

                                    {/* Quantity Control */}
                                    <div className="col-6 col-md-3">
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
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="btn btn-sm"
                                                style={{ padding: '4px 8px', color: 'var(--primary)' }}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span style={{ fontWeight: '700', minWidth: '30px', textAlign: 'center' }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="btn btn-sm"
                                                style={{ padding: '4px 8px', color: 'var(--primary)' }}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="col-4 col-md-2 text-end">
                                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                                            Subtotal
                                        </p>
                                        <p style={{ fontWeight: '700', fontSize: '16px', color: 'var(--primary)' }}>
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Remove Button */}
                                    <div className="col-2 text-end">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="btn"
                                            style={{
                                                color: 'var(--danger)',
                                                padding: '6px 12px',
                                                transition: 'all 0.2s'
                                            }}
                                            title="Remove from cart"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart Summary */}
                <div className="col-lg-4">
                    <div className="cart-summary">
                        <h5 style={{ fontWeight: '700', marginBottom: '20px' }}>Order Summary</h5>

                        {/* Summary Details */}
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery Charges</span>
                            <span style={{ color: 'var(--success)', fontWeight: '600' }}>FREE</span>
                        </div>
                        <div className="summary-row">
                            <span>Discount</span>
                            <span style={{ color: 'var(--danger)', fontWeight: '600' }}>₹0</span>
                        </div>

                        {/* Total */}
                        <div className="summary-row total">
                            <span>Total Amount</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>

                        {/* Checkout Button */}
                        <button
                            disabled={!hasCustomerToken}
                            onClick={() => window.location.href = '#/checkout'}
                            className="btn btn-primary w-100 mt-4"
                            style={{
                                opacity: hasCustomerToken ? '1' : '0.6',
                                cursor: hasCustomerToken ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {hasCustomerToken ? 'Proceed to Checkout' : 'Log in to Checkout'}
                        </button>

                        {/* Continue Shopping */}
                        <Link
                            to="/products"
                            className="btn btn-outline-secondary w-100 mt-2"
                        >
                            Continue Shopping
                        </Link>

                        {/* Benefits */}
                        <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '13px', marginBottom: '15px', color: 'var(--text-secondary)' }}>
                                <div style={{ marginBottom: '10px' }}>✓ Free delivery on orders above ₹500</div>
                                <div style={{ marginBottom: '10px' }}>✓ Fresh products guaranteed</div>
                                <div>✓ Easy returns & quick refunds</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
