import { useSelector, useDispatch } from 'react-redux'
import { addItem } from './CartSlice.jsx'

const imageUrl = (id) => `https://images.unsplash.com/${id}?w=400&h=300&fit=crop`

const plantsArray = [
  {
    category: 'Air Purifying',
    plants: [
      { name: 'Snake Plant', image: imageUrl('photo-1611211232932-da3113c5b960'), cost: 15, description: 'Produces oxygen at night, improving air quality.' },
      { name: 'Spider Plant', image: imageUrl('photo-1572688484438-313a6e50c333'), cost: 12, description: 'Filters formaldehyde and xylene from the air.' },
      { name: 'Peace Lily', image: imageUrl('photo-1593691509543-c55fb32d8de5'), cost: 18, description: 'Removes mold spores and purifies the air.' },
      { name: 'Boston Fern', image: imageUrl('photo-1606976120746-2289a18b474e'), cost: 20, description: 'Adds humidity to the air and removes toxins.' },
      { name: 'Rubber Plant', image: imageUrl('photo-1493552152660-f915ab47ae9d'), cost: 17, description: 'Easy to care for and great at removing toxins.' },
      { name: 'Aloe Vera', image: imageUrl('photo-1613372978247-de50228e8033'), cost: 14, description: 'Purifies the air and soothes the skin.' },
    ],
  },
  {
    category: 'Aromatic',
    plants: [
      { name: 'Lavender', image: imageUrl('photo-1565011523534-747a8601f10a'), cost: 20, description: 'Calming scent that helps with relaxation and sleep.' },
      { name: 'Jasmine', image: imageUrl('photo-1553719882-c0592c54478d'), cost: 18, description: 'Sweet fragrance that lifts the mood.' },
      { name: 'Rosemary', image: imageUrl('photo-1603129624917-3c579e864025'), cost: 15, description: 'Invigorating scent, perfect for cooking.' },
      { name: 'Mint', image: imageUrl('photo-1588908933351-eeb8cd4c4521'), cost: 12, description: 'Refreshing aroma, great for teas and drinks.' },
      { name: 'Lemon Balm', image: imageUrl('photo-1777707337106-afe035a119a5'), cost: 14, description: 'Citrusy scent that relieves stress.' },
      { name: 'Basil', image: imageUrl('photo-1619805640532-21cce5fe542b'), cost: 10, description: 'Fragrant herb used in many kitchens.' },
    ],
  },
  {
    category: 'Low Maintenance',
    plants: [
      { name: 'ZZ Plant', image: imageUrl('photo-1632207691143-643e2a9a9361'), cost: 25, description: 'Thrives in low light and needs little water.' },
      { name: 'Pothos', image: imageUrl('photo-1598880940080-ff9a29891b85'), cost: 10, description: 'Hardy trailing plant that grows almost anywhere.' },
      { name: 'Jade Plant', image: imageUrl('photo-1616189597001-9046fce2594d'), cost: 16, description: 'Succulent that stores water in its leaves.' },
      { name: 'Cast Iron Plant', image: imageUrl('photo-1631004970665-5b3e55194900'), cost: 22, description: 'Nearly indestructible and tolerates neglect.' },
      { name: 'Ponytail Palm', image: imageUrl('photo-1492613455417-9b29854f4669'), cost: 24, description: 'Quirky palm that needs watering only occasionally.' },
      { name: 'Cactus', image: imageUrl('photo-1528475478853-5b89bed65c4c'), cost: 8, description: 'Loves sunlight and needs very little care.' },
    ],
  },
]

const categoryId = (category) => category.toLowerCase().replace(/\s+/g, '-')

export function Navbar({ navigate, currentPage }) {
  const items = useSelector((state) => state.cart.items)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  const linkClass = (page) => (currentPage === page ? 'nav-link active' : 'nav-link')

  const go = (e, page) => {
    e.preventDefault()
    navigate(page)
  }

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('home')}>
        <span className="logo-icon">🌿</span>
        <div>
          <h3>Paradise Nursery</h3>
          <i>Where Green Meets Serenity</i>
        </div>
      </div>
      <div className="nav-links">
        <a href="#" className={linkClass('home')} onClick={(e) => go(e, 'home')}>Home</a>
        <a href="#" className={linkClass('plants')} onClick={(e) => go(e, 'plants')}>Plants</a>
        <a href="#" className={linkClass('cart')} onClick={(e) => go(e, 'cart')}>Cart</a>
        <a href="#" className="cart-icon" aria-label="Cart" onClick={(e) => go(e, 'cart')}>
          🛒<span className="cart-count">{totalQuantity}</span>
        </a>
      </div>
    </nav>
  )
}

function ProductList({ navigate }) {
  const items = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  const isInCart = (name) => items.some((item) => item.name === name)

  const scrollToCategory = (e, category) => {
    e.preventDefault()
    document.getElementById(categoryId(category)).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div className="sticky-header">
        <Navbar navigate={navigate} currentPage="plants" />
        <div className="category-menu">
          {plantsArray.map((group) => (
            <a
              key={group.category}
              href={`#${categoryId(group.category)}`}
              onClick={(e) => scrollToCategory(e, group.category)}
            >
              {group.category}
            </a>
          ))}
        </div>
      </div>
      <div className="product-list">
        {plantsArray.map((group) => (
          <section key={group.category} id={categoryId(group.category)} className="category-section">
            <h2 className="category-heading">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p className="price">${plant.cost}</p>
                  <p className="description">{plant.description}</p>
                  <button
                    className="btn"
                    disabled={isInCart(plant.name)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ProductList
