import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './CartSlice.jsx'

const loadCart = () => {
  try {
    const saved = localStorage.getItem('cart')
    if (!saved) return undefined
    const items = JSON.parse(saved)
    return Array.isArray(items) ? { cart: { items } } : undefined
  } catch {
    return undefined
  }
}

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: loadCart(),
})

store.subscribe(() => {
  try {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart.items))
  } catch {
    console.error('Could not save cart')
  }
})

export default store
