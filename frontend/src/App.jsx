import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import ProductList from './components/ProductList'
import './App.css'

const API_URL = 'https://examu3canarte.onrender.com/cart'

function App() {
  const [cartProducts, setCartProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const total = cartProducts.reduce((sum, product) => sum + product.price, 0)
    setTotalPrice(parseFloat(total.toFixed(2)))
  }, [cartProducts])

  const handleSearchProduct = async (productId) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(`${API_URL}/search/${productId}`)
      
      if (response.data.success) {
        const product = response.data.product

        const cartItem = {
          ...product,
          cartItemId: `${product._id}-${Date.now()}`
        }
        
        setCartProducts(prev => [...prev, cartItem])
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Product not found'
      setError(errorMsg)
      setTimeout(() => setError(null), 3000)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = (cartItemId) => {
    setCartProducts(prev => prev.filter(item => item.cartItemId !== cartItemId))
  }

  return (
    <div className="app">
      <div className="app-container">
        <h1>Product Calculator</h1>

        {error && <div className="error-message">{error}</div>}

        <SearchBar onSearch={handleSearchProduct} loading={loading} />

        <ProductList
          products={cartProducts}
          totalPrice={totalPrice}
          onDelete={handleDeleteProduct}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default App
