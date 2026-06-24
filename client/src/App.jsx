import PriceChart from './PriceChart'
import AlertList from './AlertList'
import Login from './Login'
import { useState } from 'react'


function App() {

  const [token, setToken] = useState(null)

  if(!token){
    return <Login onLogin={(t) => setToken(t)} />
  }

  return (
    <div>
      <h1>Price Tracker</h1>
      <PriceChart productId={2} />
      <AlertList />
    </div>
  )
}

export default App