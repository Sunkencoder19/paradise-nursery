import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from './CartSlice.jsx'
import { Navbar } from './ProductList.jsx'

function CartItem({ navigate }) {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const timerRef = useRef(null)

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalCost = items.reduce((sum, item) => sum + item.cost * item.quantity, 0)

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  const handleCheckout = () => {
    setMessage('Checkout Coming Soon')
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <Navbar navigate={navigate} currentPage="cart" />
      <div className="cart-container">
        <h2>Shopping Cart</h2>

        {message && (
          <div className="message-banner" role="status">
            {message}
          </div>
        )}

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button className="btn" onClick={() => navigate('plants')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-summary">
              <p>Total Plants: {totalQuantity}</p>
              <p>Total Cost: ${totalCost.toFixed(2)}</p>
            </div>

            <div className="cart-list">
              {items.map((item) => (
                <div className="cart-item" key={item.name}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Unit Price: ${item.cost.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() =>
                          dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))
                        }
                      >
                        +
                      </button>
                    </div>
                    <p>Subtotal: ${(item.cost * item.quantity).toFixed(2)}</p>
                    <button className="btn delete-btn" onClick={() => dispatch(removeItem(item.name))}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button className="btn" onClick={() => navigate('plants')}>
                Continue Shopping
              </button>
              <button className="btn checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartItem
