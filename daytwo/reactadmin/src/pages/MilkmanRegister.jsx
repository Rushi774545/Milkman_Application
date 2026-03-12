import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Milk, User, Lock, Mail, Phone, MapPin, Store, AlertCircle, Loader2 } from 'lucide-react';

const MilkmanRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        store_name: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/provider/register/', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                store_name: formData.store_name,
                password: formData.password
            });
            localStorage.setItem('providerToken', res.data.token);
            localStorage.setItem('providerUser', JSON.stringify(res.data.user));
            navigate('/milkman-dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please check your details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
            <div className="card shadow-lg border-0" style={{ maxWidth: '600px', width: '100%', borderRadius: '24px', background: 'var(--card-bg)' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-5">
                        <div style={{ background: 'var(--primary-gradient)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <Milk size={35} color="white" />
                        </div>
                        <h2 style={{ fontWeight: '800', letterSpacing: '-1px' }}>Milkman Registration</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Join our marketplace as a dairy provider</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" style={{ borderRadius: '12px', background: 'rgba(231, 76, 60, 0.1)', border: 'none', color: 'var(--danger)' }}>
                            <AlertCircle size={20} className="me-2" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-bold small text-uppercase" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                                <div className="input-group">
                                    <span className="input-group-text border-0 bg-dark-subtle">
                                        <User size={18} />
                                    </span>
                                    <input type="text" name="name" className="form-control border-0 bg-dark-subtle" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-bold small text-uppercase" style={{ color: 'var(--text-secondary)' }}>Dairy/Store Name</label>
                                <div className="input-group">
                                    <span className="input-group-text border-0 bg-dark-subtle">
                                        <Store size={18} />
                                    </span>
                                    <input type="text" name="store_name" className="form-control border-0 bg-dark-subtle" placeholder="e.g. Fresh Farm" value={formData.store_name} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-bold small text-uppercase" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text border-0 bg-dark-subtle">
                                        <Mail size={18} />
                                    </span>
                                    <input type="email" name="email" className="form-control border-0 bg-dark-subtle" placeholder="Email" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-bold small text-uppercase" style={{ color: 'var(--text-secondary)' }}>Phone Number</label>
                                <div className="input-group">
                                    <span className="input-group-text border-0 bg-dark-subtle">
                                        <Phone size={18} />
                                    </span>
                                    <input type="text" name="phone" className="form-control border-0 bg-dark-subtle" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold small text-uppercase" style={{ color: 'var(--text-secondary)' }}>Farm/Store Address</label>
                            <div className="input-group">
                                <span className="input-group-text border-0 bg-dark-subtle">
                                    <MapPin size={18} />
                                </span>
                                <input type="text" name="address" className="form-control border-0 bg-dark-subtle" placeholder="Full address" value={formData.address} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-bold small text-uppercase" style={{ color: 'var(--text-secondary)' }}>Password</label>
                                <div className="input-group">
                                    <span className="input-group-text border-0 bg-dark-subtle">
                                        <Lock size={18} />
                                    </span>
                                    <input type="password" name="password" className="form-control border-0 bg-dark-subtle" placeholder="Password" value={formData.password} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-bold small text-uppercase" style={{ color: 'var(--text-secondary)' }}>Confirm Password</label>
                                <div className="input-group">
                                    <span className="input-group-text border-0 bg-dark-subtle">
                                        <Lock size={18} />
                                    </span>
                                    <input type="password" name="confirmPassword" className="form-control border-0 bg-dark-subtle" placeholder="Repeat" value={formData.confirmPassword} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-3 d-flex align-items-center justify-content-center mt-3"
                            style={{ borderRadius: '12px', fontWeight: '700' }}
                            disabled={loading}
                        >
                            {loading ? (
                                <><Loader2 size={20} className="me-2 spin" /> Registering...</>
                            ) : 'Create Provider Account'}
                        </button>
                    </form>

                    <div className="mt-5 text-center small">
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Already have a milkman account? <Link to="/milkman-login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MilkmanRegister;
