import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const stored = localStorage.getItem('cart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const addToCart = (product, quantity = 1) => {
        const existing = cart.find((p) => p.id === product.id);
        if (existing) {
            saveCart(
                cart.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
                )
            );
        } else {
            saveCart([...cart, { ...product, quantity }]);
        }
    };

    const updateQuantity = (productId, quantity) => {
        saveCart(
            cart.map((p) =>
                p.id === productId ? { ...p, quantity } : p
            )
        );
    };

    const removeFromCart = (productId) => {
        saveCart(cart.filter((p) => p.id !== productId));
    };

    const clearCart = () => {
        saveCart([]);
    };

    const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, total }}
        >
            {children}
        </CartContext.Provider>
    );
};
