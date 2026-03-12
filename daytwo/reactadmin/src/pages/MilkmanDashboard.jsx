import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ShoppingBag, Clock, CheckCircle, Package, User, LogOut, Loader2, AlertCircle, Phone, MapPin } from 'lucide-react';

const MilkmanDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('providerUser'));
        if (!storedUser) {
            navigate('/milkman-login');
            return;
        }
        setUser(storedUser);
        loadOrders();
    }, [navigate]);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const res = await api.get('/provider/orders/');
            setOrders(res.data);
        } catch (err) {
            setError('Failed to load orders. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (orderId, currentStatus) => {
        try {
            await api.patch(`/provider/orders/${orderId}/`, { is_active: !currentStatus });
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, is_active: !currentStatus } : o));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('providerToken');
        localStorage.removeItem('providerUser');
        navigate('/milkman-login');
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <Loader2 size={60} className="spin" style={{ color: 'var(--primary)', marginBottom: '20px' }} />
                <h3>Loading Dashboard...</h3>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-5 p-4" style={{ background: 'var(--card-bg)', borderRadius: '24px', boxShadow: 'var(--shadow)' }}>
                <div className="d-flex align-items-center">
                    <div style={{ background: 'var(--primary-gradient)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }}>
                        <User size={30} color="white" />
                    </div>
                    <div>
                        <h2 className="mb-0 fw-bold">{user?.store_name}</h2>
                        <p className="text-secondary mb-0">Milkman: {user?.name}</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="btn btn-outline-danger d-flex align-items-center" style={{ borderRadius: '12px', fontWeight: '600' }}>
                    <LogOut size={18} className="me-2" /> Logout
                </button>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="p-4" style={{ background: 'var(--card-bg)', borderRadius: '20px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
                        <div className="d-flex align-items-center mb-3">
                            <div style={{ background: 'rgba(0, 123, 255, 0.1)', color: 'var(--primary)', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                                <ShoppingBag size={22} />
                            </div>
                            <h5 className="mb-0 fw-bold">Total Orders</h5>
                        </div>
                        <h2 className="mb-0 fw-bold">{orders.length}</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4" style={{ background: 'var(--card-bg)', borderRadius: '20px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
                        <div className="d-flex align-items-center mb-3">
                            <div style={{ background: 'rgba(39, 174, 96, 0.1)', color: 'var(--success)', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                                <CheckCircle size={22} />
                            </div>
                            <h5 className="mb-0 fw-bold">Active Orders</h5>
                        </div>
                        <h2 className="mb-0 fw-bold">{orders.filter(o => o.is_active).length}</h2>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="p-4" style={{ background: 'var(--card-bg)', borderRadius: '20px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
                        <div className="d-flex align-items-center mb-3">
                            <div style={{ background: 'rgba(231, 76, 60, 0.1)', color: 'var(--danger)', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
                                <Clock size={22} />
                            </div>
                            <h5 className="mb-0 fw-bold">Pending Delivery</h5>
                        </div>
                        <h2 className="mb-0 fw-bold">{orders.filter(o => o.is_active).length}</h2>
                    </div>
                </div>
            </div>

            <h3 className="mb-4 fw-bold">Recent Orders</h3>

            {orders.length === 0 ? (
                <div className="text-center py-5 p-4" style={{ background: 'var(--card-bg)', borderRadius: '24px' }}>
                    <Package size={80} style={{ color: 'var(--text-secondary)', opacity: '0.2', marginBottom: '20px' }} />
                    <h4 className="text-secondary">No orders found for your products</h4>
                </div>
            ) : (
                <div className="table-responsive" style={{ borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
                    <table className="table table-dark table-hover mb-0" style={{ background: 'var(--card-bg)' }}>
                        <thead style={{ background: '#111' }}>
                            <tr>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Product</th>
                                <th className="p-4 text-center">Qty</th>
                                <th className="p-4">Delivery Address</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td className="p-4">
                                        <div className="fw-bold">{order.customer_name}</div>
                                        <div className="small text-secondary"><Phone size={12} className="me-1" /> {order.customer_phone}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="fw-bold">{order.product_name}</div>
                                        <div className="small text-secondary">Ordered on: {new Date(order.start_date).toLocaleDateString()}</div>
                                    </td>
                                    <td className="p-4 text-center fw-bold">{order.quantity}</td>
                                    <td className="p-4">
                                        <div className="small"><MapPin size={12} className="me-1" /> {order.customer_address}</div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`badge ${order.is_active ? 'bg-success' : 'bg-secondary'} p-2 px-3`} style={{ borderRadius: '8px' }}>
                                            {order.is_active ? 'Active' : 'Completed'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button 
                                            onClick={() => toggleStatus(order.id, order.is_active)}
                                            className={`btn btn-sm ${order.is_active ? 'btn-outline-success' : 'btn-outline-secondary'} px-3`}
                                            style={{ borderRadius: '8px', fontWeight: '600' }}
                                        >
                                            {order.is_active ? 'Mark Delivered' : 'Undo'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MilkmanDashboard;
