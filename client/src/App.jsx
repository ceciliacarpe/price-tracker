import PriceChart from './PriceChart'
import AlertList from './AlertList'


function App() {
  return (
    <div>
      <h1>Price Tracker</h1>
      <PriceChart productId={2} />
      <AlertList />
    </div>
  )
}

export default App