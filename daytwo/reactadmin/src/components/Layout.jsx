import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Search, ShoppingCart, LogOut, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const staffUser = JSON.parse(localStorage.getItem('staffUser') || 'null');
    const customerUser = JSON.parse(localStorage.getItem('customerUser') || 'null');
    const hasStaff = !!localStorage.getItem('staffToken');
    const hasCustomer = !!localStorage.getItem('customerToken');
    const { cart } = useContext(CartContext);

    const handleStaffLogout = () => {
        localStorage.removeItem('staffToken');
        localStorage.removeItem('staffUser');
        navigate('/login');
    };

    const handleCustomerLogout = () => {
        localStorage.removeItem('customerToken');
        localStorage.removeItem('customerUser');
        localStorage.removeItem('cart');
        navigate('/customer-login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/products?search=${encodeURIComponent(search)}`);
            setSearch('');
        }
    };

    // Staff/Admin Navbar
    if (hasStaff) {
        return (
            <div>
                <nav className="navbar fixed-top">
                    <div className="container-fluid ps-4 pe-4">
                        <Link className="navbar-brand text-white fw-bold fs-4" to="/">
                            🥛 Milkman Admin
                        </Link>
                        <button 
                            className="navbar-toggler btn-light"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item"><Link className="nav-link" to="/staff">Staff</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/customer">Customers</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/category">Categories</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/product">Products</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/subscription">Subscriptions</Link></li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <span className="nav-link text-white">{staffUser?.email}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-light btn-sm ms-2" onClick={handleStaffLogout}>
                                        <LogOut size={16} className="me-1" /> Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid" style={{ marginTop: '80px' }}>
                    {children}
                </div>
            </div>
        );
    }

    // Customer/Public Navbar
    return (
        <div>
            <nav className="navbar fixed-top">
                <div className="container-fluid ps-3 pe-3">
                    <Link className="navbar-brand text-white fw-bold fs-4 flex-shrink-0" to="/">
                        🥛 Milkman
                    </Link>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="search-container d-none d-md-flex">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ borderRadius: '20px', paddingLeft: '15px', paddingRight: '40px' }}
                        />
                        <button type="submit" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer' }}>
                            <Search size={18} color="var(--primary)" />
                        </button>
                    </form>

                    <button 
                        className="navbar-toggler btn-light"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                            {hasCustomer && (
                                <>
                                    <li className="nav-item"><Link className="nav-link" to="/order-history">Orders</Link></li>
                                    <li className="nav-item position-relative">
                                        <Link className="nav-link" to="/cart">
                                            <ShoppingCart size={20} />
                                            {cart.length > 0 && (
                                                <span className="badge-cart">{cart.length}</span>
                                            )}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link text-white">{customerUser?.email}</span>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-light btn-sm" onClick={handleCustomerLogout}>
                                            <LogOut size={16} />
                                        </button>
                                    </li>
                                </>
                            )}
                            {!hasCustomer && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link btn btn-light btn-sm text-dark fw-600" to="/customer-login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link btn btn-outline-light btn-sm ms-2" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Mobile Search Bar */}
            {hasCustomer && (
                <form onSubmit={handleSearch} className="d-md-none ps-3 pe-3" style={{ marginTop: '70px', marginBottom: '10px' }}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
            )}

            <div className="container-fluid" style={{ marginTop: hasCustomer ? '130px' : '80px' }}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
