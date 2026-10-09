# Paradise Nursery

Paradise Nursery is an online plant shop where you can browse air purifying, aromatic and low maintenance houseplants.
Add plants to your cart, adjust quantities and see your totals update instantly.

## Features

- **Landing page** with a full-screen background, a short introduction to the company and a "Get Started" button
- **Product listing** with 18 plants grouped into three categories: Air Purifying, Aromatic and Low Maintenance
- **Add to Cart** buttons that show "Added to Cart" and are disabled once a plant is in the cart
- **Navigation bar** with links to Home, Plants and Cart, and a cart icon showing the total number of items
- **Shopping cart** where you can:
  - increase or decrease the quantity of each plant
  - delete plants from the cart
  - see the subtotal for each plant, the total number of plants and the total cost
  - continue shopping or check out

## Tech Used

- [React](https://react.dev/): UI components
- [Redux Toolkit](https://redux-toolkit.js.org/) and [React Redux](https://react-redux.js.org/): cart state management
- [Vite](https://vite.dev/): development server and build tool

## Project Structure

```
src/
├── main.jsx          Entry point, wraps the app in the Redux Provider
├── App.jsx           Landing page and page switching
├── App.css           Styles for all pages
├── AboutUs.jsx       Short description of the company
├── ProductList.jsx   Navbar and plant listing
├── CartItem.jsx      Shopping cart page
├── CartSlice.jsx     Cart reducers: addItem, removeItem, updateQuantity
└── store.jsx         Redux store configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

```bash
git clone https://github.com/sunkencoder19/paradise-nursery.git
cd paradise-nursery
npm install
```

### Run Locally

```bash
npm run dev
```

Then open the local URL printed in the terminal.

## Available Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the development server                   |
| `npm run build`   | Build the app for production into `dist/`      |
| `npm run preview` | Preview the production build locally           |

