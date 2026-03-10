import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Checkout = () => {
    const { cart, total, clearCart } = useContext(CartContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Populate from logged in customer
        const user = JSON.parse(localStorage.getItem('customerUser') || '{}');
        if (user && user.id) {
            setFormData(prev => ({
                ...prev,
                email: user.email || '',
                firstName: user.first_name || '',
                lastName: user.last_name || '',
            }));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlaceOrder = async () => {
        setError(null);
        setLoading(true);
        
        if (!formData.address || !formData.phone) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        if (cart.length === 0) {
            setError('Your cart is empty');
            setLoading(false);
            return;
        }

        try {
            for (const item of cart) {
                await api.post('/subscription/subscription/', {
                    product: item.id,
                    quantity: item.quantity,
                });
            }
            clearCart();
            navigate('/success');
        } catch (err) {
            setError('Failed to place order. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="py-5 text-center">
                <h3 style={{ fontWeight: '700', marginBottom: '10px' }}>No items in cart</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Please add items to proceed with checkout</p>
            </div>
        );
    }

    return (
        <div className="pb-5">
            {/* Page Header */}
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontWeight: '700', marginBottom: '10px' }}>Checkout</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Complete your order in 2 steps</p>
            </div>

            {/* Error Alert */}
            {error && (
                <div style={{ 
                    background: '#fee', 
                    color: 'var(--danger)', 
                    padding: '15px 20px',
                    borderRadius: '8px',
                    marginBottom: '25px',
                    border: '1px solid #fcc'
                }}>
                    {error}
                </div>
            )}

            <div className="row g-4">
                {/* Checkout Form */}
                <div className="col-lg-8">
                    {/* Delivery Address */}
                    <div className="checkout-form mb-4">
                        <h5 style={{ fontWeight: '700', marginBottom: '20px' }}>
                            <MapPin size={20} style={{ display: 'inline', marginRight: '10px', color: 'var(--primary)' }} />
                            Delivery Address
                        </h5>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">First Name *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="John"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Last Name *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Doe"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email *</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Phone *</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Full Address *</label>
                                <textarea
                                    className="form-control"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Street address, apartment number, etc."
                                    rows="3"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">City *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="New Delhi"
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">ZIP Code *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    placeholder="110001"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="checkout-form">
                        <h5 style={{ fontWeight: '700', marginBottom: '20px' }}>Payment Method</h5>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '2px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', background: paymentMethod === 'cod' ? 'var(--light-bg)' : 'transparent' }}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ marginRight: '12px', cursor: 'pointer' }}
                                />
                                <div>
                                    <div style={{ fontWeight: '700' }}>Cash on Delivery</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pay when you receive your order</div>
                                </div>
                            </label>
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '2px solid #ccc', borderRadius: '8px', cursor: 'not-allowed', opacity: '0.6', background: 'transparent' }}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    disabled
                                    style={{ marginRight: '12px', cursor: 'not-allowed' }}
                                />
                                <div>
                                    <div style={{ fontWeight: '700' }}>Credit/Debit Card</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Coming soon</div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="col-lg-4">
                    <div className="cart-summary sticky-top" style={{ top: '100px' }}>
                        <h5 style={{ fontWeight: '700', marginBottom: '20px' }}>Order Summary</h5>

                        {/* Items List */}
                        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
                            {cart.map((item) => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span style={{ fontWeight: '600' }}>
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Price Breakdown */}
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Delivery Charges</span>
                            <span style={{ color: 'var(--success)', fontWeight: '600' }}>FREE</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax & Charges</span>
                            <span>₹0</span>
                        </div>

                        {/* Total */}
                        <div className="summary-row total">
                            <span>Total Amount</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>

                        {/* Delivery Info */}
                        <div style={{ background: 'var(--light-bg)', padding: '15px', borderRadius: '8px', marginTop: '20px', marginBottom: '20px', textAlign: 'center', fontSize: '13px' }}>
                            <Clock size={16} style={{ display: 'inline', marginRight: '8px', color: 'var(--primary)' }} />
                            <strong>Delivery Tomorrow</strong> by 10 AM
                        </div>

                        {/* Place Order Button */}
                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                opacity: loading ? '0.7' : '1',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>

                        {/* Trust Badges */}
                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            <div style={{ marginBottom: '10px' }}>✓ Secure checkout</div>
                            <div>✓ 100% Fresh guarantee</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
