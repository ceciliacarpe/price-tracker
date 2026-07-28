import PriceChart from './PriceChart'
import AlertList from './AlertList'
import Login from './Login'
import ProductList from './ProductList'
import AddProduct from './AddProduct'
import { useState } from 'react'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [productoId, setProductoId] = useState(null)
  const [alertasOpen, setAlertasOpen] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)

  const [refresh, setRefresh] = useState(0)

  if (!token) {
    return <Login onLogin={(t) => {
          localStorage.setItem('token', t)
          setToken(t)
        }} />
  }

  return (
    <div className="min-h-screen bg-cream">

      {/* Navbar */}
      <nav className="border-b border-steel/20 bg-white/60 backdrop-blur-sm px-12 py-4 flex justify-between items-center sticky top-0 z-10">
        <span className="text-navy font-bold text-lg tracking-tight">Price Tracker</span>
        <button
          onClick={() => {
            localStorage.removeItem('token')
            setToken(null)
          }}
          className="text-xs text-steel hover:text-red transition-colors"
        >
          Cerrar sesión
        </button>
      </nav>

      <div className="px-12 py-10">

      {/* Header */}
      <div className="flex justify-between items-end mb-14">
        <div>
          <p className="text-xs text-steel uppercase tracking-widest mb-3">Dashboard</p>
          <h1 className="text-7xl font-bold text-lava leading-none">
            Tus<br />productos
          </h1>
        </div>

        <button
          onClick={() => setShowAddProduct(!showAddProduct)}
          className="text-xs border border-navy text-navy px-4 py-2 rounded-lg hover:bg-navy hover:text-cream transition-colors self-center"
        >
          {showAddProduct ? 'Cerrar' : '+ Añadir producto'}
        </button>

        <div className="max-w-sm text-right pb-2">
          <p className="text-steel leading-relaxed">
            Sigue los cambios de precio de los productos que te interesan.<br /><br />
            Podrás ver cuando el precio cae de verdad.
          </p>
        </div>
      </div>

      {showAddProduct && (
        <div className="mb-10">
          <AddProduct token={token} onProductAdded={() => {
            setShowAddProduct(false)
            setRefresh(r => r + 1)
          }} />
        </div>
      )}
         
        {/* Lista de productos */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-steel uppercase tracking-widest mb-5">
            Productos seguidos
          </h2>
          <ProductList
            token={token}
            refresh={refresh}
            onSelect={(id) => setProductoId(productoId === id ? null : id)}
          />
        </div>

        {/* Panel producto seleccionado */}
        {productoId && (
          <div className="border-t border-steel/20 pt-10 mt-4">

            {/* Gráfica */}
            <div className="bg-white border border-steel/20 rounded-2xl p-8 shadow-sm mb-6">
              <h2 className="text-xs font-semibold text-steel uppercase tracking-widest mb-6">
                Evolución del precio
              </h2>
              <PriceChart productId={productoId} />
            </div>

            {/* Desplegable alertas */}
            <div className="bg-white border border-steel/20 rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setAlertasOpen(!alertasOpen)}
                className="w-full flex justify-between items-center px-8 py-5 hover:bg-cream/50 transition-colors"
              >
                <span className="text-xs font-semibold text-steel uppercase tracking-widest">
                  Últimas 5 alertas de precio mínimo
                </span>
                <span className="text-steel text-xs">{alertasOpen ? '▲ Cerrar' : '▼ Ver alertas'}</span>
              </button>
              {alertasOpen && (
                <div className="px-8 pb-8">
                  <AlertList token={token} productId={productoId}/>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default App