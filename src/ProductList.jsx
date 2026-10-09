import { useSelector, useDispatch } from 'react-redux'
import { addItem } from './CartSlice.jsx'

const imageUrl = (id) => `https://images.unsplash.com/${id}?w=400&h=300&fit=crop`

const plantsArray = [
  {
    category: 'Air Purifying',
    plants: [
      { name: 'Snake Plant', image: imageUrl('photo-1593691509543-c55fb32d8de5'), cost: 15, description: 'Produces oxygen at night, improving air quality.' },
      { name: 'Spider Plant', image: imageUrl('photo-1572688484438-313a6e50c333'), cost: 12, description: 'Filters formaldehyde and xylene from the air.' },
      { name: 'Peace Lily', image: imageUrl('photo-1597305877032-0668b3c6413a'), cost: 18, description: 'Removes mold spores and purifies the air.' },
      { name: 'Boston Fern', image: imageUrl('photo-1598880940371-c756e015fea1'), cost: 20, description: 'Adds humidity to the air and removes toxins.' },
      { name: 'Rubber Plant', image: imageUrl('photo-1614594975525-e45190c55d0b'), cost: 17, description: 'Easy to care for and great at removing toxins.' },
      { name: 'Aloe Vera', image: imageUrl('photo-1509423350716-97f9360b4e09'), cost: 14, description: 'Purifies the air and soothes the skin.' },
    ],
  },
  {
    category: 'Aromatic',
    plants: [
      { name: 'Lavender', image: imageUrl('photo-1528475478853-5b89bed65c4c'), cost: 20, description: 'Calming scent that helps with relaxation and sleep.' },
      { name: 'Jasmine', image: imageUrl('photo-1558603668-6570496b66f8'), cost: 18, description: 'Sweet fragrance that lifts the mood.' },
      { name: 'Rosemary', image: imageUrl('photo-1515150144380-bca9f1650ed9'), cost: 15, description: 'Invigorating scent, perfect for cooking.' },
      { name: 'Mint', image: imageUrl('photo-1587334274328-64186a80aeee'), cost: 12, description: 'Refreshing aroma, great for teas and drinks.' },
      { name: 'Lemon Balm', image: imageUrl('photo-1611211232932-da3113c5b960'), cost: 14, description: 'Citrusy scent that relieves stress.' },
      { name: 'Basil', image: imageUrl('photo-1618160702438-9b02ab6515c9'), cost: 10, description: 'Fragrant herb used in many kitchens.' },
    ],
  },
  {
    category: 'Low Maintenance',
    plants: [
      { name: 'ZZ Plant', image: imageUrl('photo-1632207691143-643e2a9a9361'), cost: 25, description: 'Thrives in low light and needs little water.' },
      { name: 'Pothos', image: imageUrl('photo-1604762524889-3e2fcc145683'), cost: 10, description: 'Hardy trailing plant that grows almost anywhere.' },
      { name: 'Jade Plant', image: imageUrl('photo-1459411552884-841db9b3cc2a'), cost: 16, description: 'Succulent that stores water in its leaves.' },
      { name: 'Cast Iron Plant', image: imageUrl('photo-1485955900006-10f4d324d411'), cost: 22, description: 'Nearly indestructible and tolerates neglect.' },
      { name: 'Ponytail Palm', image: imageUrl('photo-1463936575829-25148e1db1b8'), cost: 24, description: 'Quirky palm that needs watering only occasionally.' },
      { name: 'Cactus', image: imageUrl('photo-1520412099551-62b6bafeb5bb'), cost: 8, description: 'Loves sunlight and needs very little care.' },
    ],
  },
]

export function Navbar({ navigate }) {
  const items = useSelector((state) => state.cart.items)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

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
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('home') }}>Home</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('plants') }}>Plants</a>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('cart') }}>Cart</a>
        <a href="#" className="cart-icon" onClick={(e) => { e.preventDefault(); navigate('cart') }}>
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

  return (
    <div>
      <Navbar navigate={navigate} />
      <div className="product-list">
        {plantsArray.map((group) => (
          <div key={group.category}>
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
