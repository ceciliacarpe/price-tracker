import { useState, useEffect } from 'react'
import axios from 'axios'

const ProductList = ({ token, onSelect, refresh }) => {
  const [productos, setProductList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/productos/mis-productos', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProductList(response.data)
      }catch (error){
        setError('Error al cargar los productos')
      }finally{
        setLoading(false)
      }
      
    }
    fetchData()
  }, [token, refresh])

  if (loading) return <p className="text-steel text-sm">Cargando productos...</p>
  if (error) return <p className="text-red text-sm">{error}</p>

  return (
    <div className="grid grid-cols-3 gap-4">
      {productos.map(producto => (
        <div
          key={producto.id}
          onClick={() => onSelect(producto.id)}
          className="bg-white border border-steel/20 rounded-2xl p-5 cursor-pointer hover:border-red hover:shadow-md transition-all duration-200 group"
        >
          <img
            src={producto.imageUrl}
            alt={producto.name}
            className="w-16 h-16 object-contain mb-4 mx-auto"
          />
          <p className="text-xs text-steel uppercase tracking-widest mb-1">{producto.category}</p>
          <p className="text-sm font-semibold text-navy leading-snug mb-3 line-clamp-2">{producto.name}</p>
          <p className="text-2xl font-bold text-lava">${producto.price}</p>
          <p className="text-xs text-steel/60 mt-2 group-hover:text-red transition-colors">Ver historial →</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList