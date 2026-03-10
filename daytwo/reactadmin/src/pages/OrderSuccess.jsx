import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Truck, Home, Gift, Zap } from 'lucide-react';

const OrderSuccess = () => {
    const [ref, setRef] = useState(null);
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        // Generate order reference once
        const gen = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        setRef(gen);
        // Generate confetti
        const newConfetti = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 1.5,
            color: ['#1f4788', '#ff9500', '#2ecc71'][Math.floor(Math.random() * 3)]
        }));
        setConfetti(newConfetti);
    }, []);

    return (
        <div className="pb-5">
            {/* Confetti Container */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                {confetti.map(item => (
                    <div
                        key={item.id}
                        style={{
                            position: 'fixed',
                            left: `${item.left}%`,
                            top: '-10px',
                            width: '10px',
                            height: '10px',
                            background: item.color,
                            borderRadius: '50%',
                            animation: `fall ${item.duration}s linear ${item.delay}s 1 forwards`,
                            zIndex: 1,
                        }}
                    />
                ))}
            </div>

            <div style={{ textAlign: 'center', padding: '60px 20px', position: 'relative', zIndex: 2 }}>
                {/* Success Icon with Pulse */}
                <div style={{ marginBottom: '30px', position: 'relative', display: 'inline-block' }}>
                    <div style={{
                        position: 'absolute',
                        width: '120px',
                        height: '120px',
                        background: 'rgba(31, 71, 136, 0.1)',
                        borderRadius: '50%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'pulse-ring 2s ease-out infinite'
                    }} />
                    <div style={{
                        position: 'absolute',
                        width: '80px',
                        height: '80px',
                        background: 'rgba(31, 71, 136, 0.2)',
                        borderRadius: '50%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'pulse-ring 2s ease-out 0.3s infinite'
                    }} />
                    <CheckCircle size={100} style={{ color: 'var(--success)', animation: 'bounce 0.6s', position: 'relative', zIndex: 3 }} />
                </div>

                {/* Success Message */}
                <h1 style={{ fontWeight: '700', fontSize: '32px', marginBottom: '15px', color: 'var(--primary)', animation: 'slideDown 0.8s ease-out' }}>
                    Order Placed Successfully! 🎉
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '30px', animation: 'slideDown 0.8s ease-out 0.1s forwards', opacity: 0 }}>
                    Thank you for your order. Your fresh dairy products are on the way!
                </p>

                {/* Order Reference Card with Glow */}
                <div style={{
                    background: 'var(--card-bg)',
                    padding: '30px',
                    borderRadius: '12px',
                    maxWidth: '600px',
                    margin: '30px auto',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 0 20px rgba(46, 204, 113, 0.1)',
                    border: '2px solid var(--light-bg)',
                    animation: 'glow 2s ease-in-out infinite, slideDown 0.8s ease-out 0.2s forwards',
                    opacity: 0
                }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '14px' }}>
                        Order Reference Number
                    </p>
                    {ref && (
                        <h2 style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '28px', marginBottom: '20px', wordBreak: 'break-all' }}>
                            {ref}
                        </h2>
                    )}
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                        Keep this reference for your records. You'll receive email confirmation and tracking updates.
                    </p>
                </div>

                {/* Timeline */}
                <div style={{ maxWidth: '600px', margin: '40px auto', animation: 'slideDown 0.8s ease-out 0.3s forwards', opacity: 0 }}>
                    <h4 style={{ fontWeight: '700', marginBottom: '25px' }}>What's Next?</h4>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                            <div style={{ flex: '0 0 40px', textAlign: 'center' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--success)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    animation: 'scaleIn 0.6s ease-out'
                                }}>
                                    <CheckCircle size={20} />
                                </div>
                            </div>
                            <div>
                                <h6 style={{ fontWeight: '700', marginBottom: '4px' }}>Order Confirmed</h6>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>We've received your order</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                            <div style={{ flex: '0 0 40px', textAlign: 'center' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: '#e0e0e0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    animation: 'scaleIn 0.6s ease-out 0.2s forwards',
                                    opacity: 0
                                }}>
                                    <Zap size={20} />
                                </div>
                            </div>
                            <div>
                                <h6 style={{ fontWeight: '700', marginBottom: '4px' }}>Processing</h6>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>We're preparing your order</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                            <div style={{ flex: '0 0 40px', textAlign: 'center' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: '#e0e0e0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    animation: 'scaleIn 0.6s ease-out 0.4s forwards',
                                    opacity: 0
                                }}>
                                    <Truck size={20} />
                                </div>
                            </div>
                            <div>
                                <h6 style={{ fontWeight: '700', marginBottom: '4px' }}>Out for Delivery</h6>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Tomorrow morning</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: '0 0 40px', textAlign: 'center' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: '#e0e0e0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    animation: 'scaleIn 0.6s ease-out 0.6s forwards',
                                    opacity: 0
                                }}>
                                    <Home size={20} />
                                </div>
                            </div>
                            <div>
                                <h6 style={{ fontWeight: '700', marginBottom: '4px' }}>Delivered</h6>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>By 10 AM tomorrow</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', maxWidth: '400px', margin: '40px auto 0', animation: 'slideDown 0.8s ease-out 0.4s forwards', opacity: 0 }}>
                    <Link 
                        to="/order-history" 
                        className="btn btn-primary"
                        style={{ flex: 1, textDecoration: 'none' }}
                    >
                        View Orders
                    </Link>
                    <Link 
                        to="/products" 
                        className="btn btn-outline-secondary"
                        style={{ flex: 1, textDecoration: 'none' }}
                    >
                        Continue Shopping
                    </Link>
                </div>

                {/* Info Box */}
                <div style={{ marginTop: '40px', padding: '20px', background: 'var(--light-bg)', borderRadius: '8px', maxWidth: '600px', margin: '40px auto 0', animation: 'slideDown 0.8s ease-out 0.5s forwards', opacity: 0 }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        📧 Check your email for order confirmation and delivery updates<br />
                        📞 Need help? Contact our support team anytime
                    </p>
                </div>

                {/* Special Offer Box */}
                <div style={{ marginTop: '40px', padding: '25px', background: 'linear-gradient(135deg, var(--accent) 0%, #ff7e50 100%)', color: 'white', borderRadius: '8px', maxWidth: '600px', margin: '40px auto 0', animation: 'slideDown 0.8s ease-out 0.6s forwards, pulse-glow 2s ease-in-out 2s infinite', opacity: 0 }}>
                    <Gift size={24} style={{ display: 'inline-block', marginRight: '10px' }} />
                    <strong>Limited Time Offer!</strong>
                    <p style={{ fontSize: '14px', marginTop: '8px' }}>
                        Your next order gets 10% off! Use code: <strong>WELCOME10</strong>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fall {
                    to {
                        transform: translateY(100vh) rotateZ(360deg);
                        opacity: 0;
                    }
                }

                @keyframes pulse-ring {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(2);
                        opacity: 0;
                    }
                }

                @keyframes scaleIn {
                    from {
                        transform: scale(0);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes glow {
                    0%, 100% {
                        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08), 0 0 20px rgba(46, 204, 113, 0.1);
                    }
                    50% {
                        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08), 0 0 40px rgba(46, 204, 113, 0.3);
                    }
                }

                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 10px rgba(255, 150, 0, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(255, 150, 0, 0.6);
                    }
                }
            `}</style>
        </div>
    );
};

export default OrderSuccess;
