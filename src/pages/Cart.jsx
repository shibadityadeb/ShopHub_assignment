"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import "./Cart.css"

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleCheckout = () => {
    clearCart()
    setShowConfirmation(true)

    // Hide confirmation message after 4 seconds
    setTimeout(() => {
      setShowConfirmation(false)
    }, 4000)
  }

  if (cartItems.length === 0 && !showConfirmation) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here!</p>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {showConfirmation && (
        <div className="checkout-confirmation">
          <p>✓ Order placed successfully! Thank you for your purchase.</p>
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} />
                </div>

                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="item-actions">
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>

                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>

                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
