import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [orderSummary, setOrderSummary] = useState({
        subtotal: 0,
        delivery: 10000,
        discount: 0,
        total: 0,
    });

    const addToCart = (product, quantity) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity }]);
        }
        updateOrderSummary();
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
        updateOrderSummary();
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
        updateOrderSummary();
    };

    const updateOrderSummary = () => {
        const subtotal = cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        setOrderSummary({
            subtotal,
            delivery: 10000,
            discount: 0,
            total: subtotal + 10000,
        });
    };

    const clearCart = () => {
        setCartItems([]);
        updateOrderSummary();
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                orderSummary,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
