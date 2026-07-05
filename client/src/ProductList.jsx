import { useState, useEffect } from 'react'
import axios from 'axios'

const ProductList = ({ token, onSelect }) => {
  const [productos, setProductList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/productos/mis-productos', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProductList(response.data)
    }
    fetchData()
  }, [token])

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