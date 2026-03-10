import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Mail, Lock, AlertCircle } from 'lucide-react';

const CustomerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('customerToken')) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await api.post('/customer/login/', { email, password });
            const { token, customer_id, name } = response.data;
            localStorage.setItem('customerToken', token);
            localStorage.setItem('customerUser', JSON.stringify({ email, id: customer_id, name }));
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--light-bg)', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '450px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '10px' }}>
                        🥛 Milkman
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                        Sign in to your account
                    </p>
                </div>

                {/* Login Card */}
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

                    {/* Login Form */}
                    <form onSubmit={handleLogin}>
                        {/* Email Field */}
                        <div style={{ marginBottom: '20px' }}>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    style={{
                                        paddingLeft: '40px',
                                        border: '2px solid var(--border-color)',
                                        borderRadius: '8px'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: '10px' }}>
                            <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px' }}>
                                Password
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    style={{
                                        paddingLeft: '40px',
                                        border: '2px solid var(--border-color)',
                                        borderRadius: '8px'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ cursor: 'pointer' }} />
                                Remember me
                            </label>
                            <Link to="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{
                                width: '100%',
                                padding: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                opacity: loading ? '0.7' : '1',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '25px 0', color: 'var(--text-secondary)' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                        <span style={{ fontSize: '13px' }}>New to Milkman?</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                    </div>

                    {/* Sign Up Link */}
                    <Link
                        to="/customer-register"
                        className="btn btn-outline-secondary"
                        style={{
                            width: '100%',
                            padding: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            display: 'block',
                            textAlign: 'center'
                        }}
                    >
                        Create an Account
                    </Link>
                </div>

                {/* Trust Section */}
                <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <p style={{ marginBottom: '8px' }}>🔒 Secure login • Your data is protected</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
