'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Standard Oil Dispenser',
    price: 29.99,
    description: 'Perfect for home use with 1L capacity',
    image: '🛢️',
  },
  {
    id: 2,
    name: 'Premium Oil Dispenser',
    price: 49.99,
    description: 'High-capacity 2L with precision pouring',
    image: '🛢️',
  },
  {
    id: 3,
    name: 'Professional Oil Dispenser',
    price: 79.99,
    description: 'Industrial 5L with measurement marks',
    image: '🛢️',
  },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>🛢️ Oil Dispenser Store</h1>
        <button
          className={styles.cartButton}
          onClick={() => setShowCart(!showCart)}
        >
          🛒 Cart ({cart.length})
        </button>
      </header>

      {showCart ? (
        <div className={styles.cartSection}>
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cart.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>${item.price.toFixed(2)} each</p>
                    </div>
                    <div className={styles.quantityControl}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.total}>
                <h3>Total: ${total.toFixed(2)}</h3>
                <button className={styles.checkoutButton}>Proceed to Checkout</button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.productsSection}>
          <h2>Our Products</h2>
          <div className={styles.products}>
            {PRODUCTS.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>{product.image}</div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className={styles.productFooter}>
                  <span className={styles.price}>${product.price.toFixed(2)}</span>
                  <button
                    className={styles.addButton}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
