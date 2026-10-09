import { useState, useEffect } from 'react'
import AboutUs from './AboutUs.jsx'
import ProductList from './ProductList.jsx'
import CartItem from './CartItem.jsx'
import './App.css'

function App() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  if (page === 'plants') {
    return <ProductList navigate={setPage} />
  }

  if (page === 'cart') {
    return <CartItem navigate={setPage} />
  }

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <h1>Paradise Nursery</h1>
        <div className="divider"></div>
        <AboutUs />
        <button className="btn get-started" onClick={() => setPage('plants')}>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App
