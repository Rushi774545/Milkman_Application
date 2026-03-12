import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { PackageOpen, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await api.get('/subscription/subscription/');
                setOrders(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="py-5 text-center">
                <div className="loader"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="pb-5">
                <div style={{ marginBottom: '30px' }}>
                    <h1 style={{ fontWeight: '700' }}>My Orders</h1>
                </div>
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <PackageOpen size={80} style={{ color: 'var(--text-secondary)', marginBottom: '20px', opacity: '0.3' }} />
                    <h3 style={{ fontWeight: '700', marginBottom: '10px' }}>No orders yet</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '16px' }}>
                        Start shopping to see your order history here
                    </p>
                    <Link to="/products" className="btn btn-primary">
                        Shop Now
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-5">
            {/* Page Header */}
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontWeight: '700' }}>My Orders</h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {orders.length} order{orders.length > 1 ? 's' : ''} placed
                </p>
            </div>

            {/* Orders List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {orders.map((order) => (
                    <div
                        key={order.id}
                        style={{
                            background: 'var(--card-bg)',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            border: '1px solid var(--border-color)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                {/* Order ID */}
                                <div style={{ marginBottom: '12px' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                        Order ID
                                    </p>
                                    <h6 style={{ fontWeight: '700', fontSize: '16px' }}>
                                        ORD-{String(order.id).padStart(6, '0')}
                                    </h6>
                                </div>

                                {/* Product Info */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '12px' }}>
                                    <div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                            Product
                                        </p>
                                        <p style={{ fontWeight: '600' }}>
                                            {order.product_name || `Product #${order.product}`}
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                            Sold By
                                        </p>
                                        <p style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                            {order.provider_store_name || 'Local Dairy'}
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                            Quantity
                                        </p>
                                        <p style={{ fontWeight: '600' }}>
                                            {order.quantity} unit{order.quantity > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                            Order Date
                                        </p>
                                        <p style={{ fontWeight: '600' }}>
                                            {new Date(order.start_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div style={{ marginTop: '12px' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        background: 'var(--success)',
                                        color: 'white',
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}>
                                        ✓ Delivered
                                    </span>
                                </div>
                            </div>

                            {/* Arrow */}
                            <div style={{ color: 'var(--text-secondary)', marginLeft: '20px' }}>
                                <ChevronRight size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Continue Shopping */}
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>
                    Want to order more items?
                </p>
                <Link to="/products" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderHistory;
