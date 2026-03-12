import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Milk, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

const MilkmanLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/provider/login/', { email, password });
            localStorage.setItem('providerToken', res.data.token);
            localStorage.setItem('providerUser', JSON.stringify(res.data.user));
            navigate('/milkman-dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg border-0" style={{ maxWidth: '450px', width: '100%', borderRadius: '24px', background: 'var(--card-bg)' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-5">
                        <div style={{ background: 'var(--primary-gradient)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <Milk size={35} color="white" />
                        </div>
                        <h2 style={{ fontWeight: '800', letterSpacing: '-1px' }}>Milkman Portal</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Log in to manage your dairy orders</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" style={{ borderRadius: '12px', background: 'rgba(231, 76, 60, 0.1)', border: 'none', color: 'var(--danger)' }}>
                            <AlertCircle size={20} className="me-2" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label fw-bold small text-uppercase" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text border-0 bg-dark-subtle" style={{ borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                                    <Mail size={18} style={{ color: 'var(--text-secondary)' }} />
                                </span>
                                <input
                                    type="email"
                                    className="form-control border-0 bg-dark-subtle"
                                    style={{ borderTopRightRadius: '12px', borderBottomRightRadius: '12px', padding: '12px' }}
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="form-label fw-bold small text-uppercase" style={{ color: 'var(--text-secondary)' }}>Password</label>
                            <div className="input-group">
                                <span className="input-group-text border-0 bg-dark-subtle" style={{ borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}>
                                    <Lock size={18} style={{ color: 'var(--text-secondary)' }} />
                                </span>
                                <input
                                    type="password"
                                    className="form-control border-0 bg-dark-subtle"
                                    style={{ borderTopRightRadius: '12px', borderBottomRightRadius: '12px', padding: '12px' }}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-3 d-flex align-items-center justify-content-center"
                            style={{ borderRadius: '12px', fontWeight: '700' }}
                            disabled={loading}
                        >
                            {loading ? (
                                <><Loader2 size={20} className="me-2 spin" /> Logging in...</>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-5 text-center small">
                        <p style={{ color: 'var(--text-secondary)' }}>
                            New milkman? <Link to="/milkman-register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Register Store</Link>
                        </p>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
                            Need help? <Link to="/contact" style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Contact Admin</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MilkmanLogin;
