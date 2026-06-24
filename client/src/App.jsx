import PriceChart from './PriceChart'
import AlertList from './AlertList'
import Login from './Login'
import ProductList from './ProductList'

import { useState } from 'react'


function App() {

  const [token, setToken] = useState(null)
  const [productoId, setProductoId] = useState(null)

  if(!token){
    return <Login onLogin={(t) => setToken(t)} />
  }

  return (
    <div>
      <h1>Price Tracker</h1>
      <ProductList token={token} onSelect={(id) => setProductoId(id)} />
      {productoId && <PriceChart productId={productoId} />}
      <AlertList token={token}  />
    </div>
  )
}

export default App