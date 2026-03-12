import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { User, Mail, Phone, MapPin, Lock, AlertCircle, CheckCircle } from 'lucide-react';

const CustomerRegister = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        
        // Validation
        if (!form.name || !form.email || !form.phone || !form.address || !form.password) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        if (form.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            await api.post('/customer/customer/', form);
            setSuccess(true);
            setTimeout(() => navigate('/customer-login'), 2000);
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--light-bg)', padding: '20px' }}>
                <div style={{ textAlign: 'center', maxWidth: '450px' }}>
                    <CheckCircle size={80} style={{ color: 'var(--success)', marginBottom: '20px' }} />
                    <h2 style={{ fontWeight: '700', marginBottom: '10px' }}>Account Created Successfully!</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                        Redirecting to login page...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--light-bg)', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '550px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px' }}>
                        🥛 Milkman
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                        Create your account to start ordering
                    </p>
                </div>

                {/* Register Card */}
                <div style={{
                    background: 'var(--card-bg)',
                    padding: '40px 30px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)'
                }}>
                    {/* Error Alert */}
                    {error && (
                        <div style={{
                            background: '#fee',
                            color: 'var(--danger)',
                            padding: '12px 15px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            display: 'flex',
                            gap: '10px',
                            fontSize: '14px',
                            border: '1px solid #fcc'
                        }}>
                            <AlertCircle size={18} style={{ flex: '0 0 18px', marginTop: '2px' }} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Register Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div style={{ marginBottom: '18px' }}>
                            <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px' }}>
                                Full Name
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-secondary)',
                                    pointerEvents: 'none'
                                }} />
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    style={{
                                        paddingLeft: '40px',
                                        border: '2px solid var(--border-color)',
                                        borderRadius: '8px'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div style={{ marginBottom: '18px' }}>
                            <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px' }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-secondary)',
                                    pointerEvents: 'none'
                                }} />
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    style={{
                                        paddingLeft: '40px',
                                        border: '2px solid var(--border-color)',
                                        borderRadius: '8px'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div style={{ marginBottom: '18px' }}>
                            <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px' }}>
                                Phone Number
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-secondary)',
                                    pointerEvents: 'none'
                                }} />
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    style={{
                                        paddingLeft: '40px',
                                        border: '2px solid var(--border-color)',
                                        borderRadius: '8px'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Address Field */}
                        <div style={{ marginBottom: '18px' }}>
                            <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px' }}>
                                Delivery Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '12px',
                                    color: 'var(--text-secondary)',
                                    pointerEvents: 'none'
                                }} />
                                <textarea
                                    className="form-control"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Street address, apartment number, etc."
                                    rows="2"
                                    style={{
                                        paddingLeft: '40px',
                                        border: '2px solid var(--border-color)',
                                        borderRadius: '8px',
                                        resize: 'none'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: '25px' }}>
                            <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px' }}>
                                Password (minimum 6 characters)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{
                                    position: 'absolute',
                                    left: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-secondary)',
                                    pointerEvents: 'none'
                                }} />
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    style={{
                                        paddingLeft: '40px',
                                        border: '2px solid var(--border-color)',
                                        borderRadius: '8px'
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-100"
                            style={{
                                padding: '16px',
                                fontSize: '18px',
                                opacity: loading ? '0.7' : '1',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '30px 0', color: 'var(--text-secondary)' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                        <span style={{ fontSize: '14px' }}>Already have an account?</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                    </div>

                    {/* Sign In Link */}
                    <Link
                        to="/customer-login"
                        className="btn btn-outline-secondary w-100"
                        style={{
                            padding: '16px',
                            fontSize: '18px',
                        }}
                    >
                        Sign In
                    </Link>
                </div>

                {/* Trust Section */}
                <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <p>🔒 Your information is secure • We never share your data</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerRegister;
