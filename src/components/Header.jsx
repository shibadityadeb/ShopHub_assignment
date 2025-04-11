"use client"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import "./Header.css"

const Header = () => {
  const { logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          ShopHub
        </Link>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link cart-link">
                Cart
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
