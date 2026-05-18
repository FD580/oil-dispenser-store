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
  customization?: {
    oilType: string;
    capacity: string;
    color: string;
  };
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

const OIL_TYPES = [
  { name: 'Olive Oil', icon: '🫒' },
  { name: 'Vegetable Oil', icon: '🌻' },
  { name: 'Canola Oil', icon: '🌼' },
  { name: 'Sunflower Oil', icon: '☀️' },
  { name: 'Sesame Oil', icon: '🌰' },
  { name: 'Coconut Oil', icon: '🥥' },
  { name: 'Avocado Oil', icon: '🥑' },
  { name: 'Peanut Oil', icon: '🥜' },
];

const CAPACITIES = ['500ml', '1L', '2L', '5L'];
const COLORS = ['Clear', 'Amber', 'Dark Brown', 'Stainless Steel'];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [customizing, setCustomizing] = useState<number | null>(null);
  const [customForm, setCustomForm] = useState({
    oilType: 'Olive Oil',
    capacity: '1L',
    color: 'Clear',
  });

  const addToCart = (product: Product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const addCustomizedToCart = (product: Product) => {
    setCart([
      ...cart,
      {
        ...product,
        quantity: 1,
        customization: customForm,
      },
    ]);
    setCustomizing(null);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
    } else {
      const newCart = [...cart];
      newCart[index].quantity = quantity;
      setCart(newCart);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (customizing !== null) {
    const product = PRODUCTS.find((p) => p.id === customizing)!;
    return (
      <div className={styles.container}>
        <button
          className={styles.backButton}
          onClick={() => setCustomizing(null)}
        >
          ← Back to Products
        </button>
        <div className={styles.customizationSection}>
          <div className={styles.customizationContainer}>
            <h2>Customize {product.name}</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              ${product.price.toFixed(2)}
            </p>

            <div className={styles.customizationForm}>
              {/* Oil Type Selection */}
              <div className={styles.formGroup}>
                <label>Select Oil Type:</label>
                <div className={styles.oilTypeGrid}>
                  {OIL_TYPES.map((oil) => (
                    <div
                      key={oil.name}
                      className={`${styles.oilTypeOption} ${
                        customForm.oilType === oil.name
                          ? styles.oilTypeSelected
                          : ''
                      }`}
                      onClick={() =>
                        setCustomForm({ ...customForm, oilType: oil.name })
                      }
                    >
                      <div className={styles.oilIcon}>{oil.icon}</div>
                      <div className={styles.oilName}>{oil.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Capacity Selection */}
              <div className={styles.formGroup}>
                <label htmlFor="capacity">Select Capacity:</label>
                <select
                  id="capacity"
                  className={styles.select}
                  value={customForm.capacity}
                  onChange={(e) =>
                    setCustomForm({ ...customForm, capacity: e.target.value })
                  }
                >
                  {CAPACITIES.map((cap) => (
                    <option key={cap} value={cap}>
                      {cap}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Selection */}
              <div className={styles.formGroup}>
                <label htmlFor="color">Select Dispenser Color:</label>
                <select
                  id="color"
                  className={styles.select}
                  value={customForm.color}
                  onChange={(e) =>
                    setCustomForm({ ...customForm, color: e.target.value })
                  }
                >
                  {COLORS.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className={styles.addToCartButton}
                onClick={() => addCustomizedToCart(product)}
              >
                Add Customized Item to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                {cart.map((item, index) => (
                  <div key={index} className={styles.cartItem}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>${item.price.toFixed(2)} each</p>
                      {item.customization && (
                        <div className={styles.customizationDetails}>
                          <p>
                            <strong>Oil Type:</strong> {item.customization.oilType}
                          </p>
                          <p>
                            <strong>Capacity:</strong> {item.customization.capacity}
                          </p>
                          <p>
                            <strong>Color:</strong> {item.customization.color}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className={styles.quantityControl}>
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        className={styles.removeButton}
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.total}>
                <h3>Total: ${total.toFixed(2)}</h3>
                <button className={styles.checkoutButton}>
                  Proceed to Checkout
                </button>
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
                    onClick={() => setCustomizing(product.id)}
                  >
                    Customize
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
