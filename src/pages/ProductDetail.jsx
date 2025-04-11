"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import "./ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) throw new Error("Failed to fetch product")

        const data = await response.json()
        setProduct(data)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("Failed to load product. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setAddedToCart(true)

      // Reset the "Added to cart" message after 3 seconds
      setTimeout(() => {
        setAddedToCart(false)
      }, 3000)
    }
  }

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0) {
      setQuantity(value)
    }
  }

  if (loading) {
    return <div className="loading">Loading product details...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!product) {
    return <div className="error">Product not found</div>
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Products
      </button>

      <div className="product-detail">
        <div className="product-image">
          <img src={product.image || "/placeholder.svg"} alt={product.title} />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-price">{product.price.toFixed(2)}</p>
          <div className="product-rating">
            <span className="rating-stars">
              {"★".repeat(Math.round(product.rating.rate))}
              {"☆".repeat(5 - Math.round(product.rating.rate))}
            </span>
            <span className="rating-count">({product.rating.count} reviews)</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" min="1" value={quantity} onChange={handleQuantityChange} />
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

            {addedToCart && <div className="added-to-cart-message">✓ Product added to your cart successfully!</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
