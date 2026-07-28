import { useState, useEffect } from 'react'
import axios from 'axios'

const AddProduct = ({ token, onProductAdded }) => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addError, setAddError] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get('https://fakestoreapi.com/products')
        setProductos(response.data)
      }catch (error){
        setError('Error al cargar los productos')
      }finally{
        setLoading(false)
      }
      
    }
    fetchData()
  }, [])

  

  const handleAdd = async (externalId) => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/productos/track',
        { externalId },
        { headers: { Authorization: `Bearer ${token}` } }
        )
        onProductAdded()
    } catch (e) {
        setAddError(e.response?.data?.error || 'Error al añadir el producto')
    }
  }

    if (loading) return <p className="text-steel text-sm">Cargando productos...</p>
    if (error) return <p className="text-red text-sm">{error}</p>

return (
  <div>
    {addError && <p className="text-red text-sm mb-4">{addError}</p>}
    <div className="grid grid-cols-4 gap-4">
      {productos.map(producto => (
        <div
          key={producto.id}
          className="bg-white border border-steel/20 rounded-2xl p-5 flex flex-col"
        >
          <img
            src={producto.image}
            alt={producto.title}
            className="w-16 h-16 object-contain mb-4 mx-auto"
          />
          <p className="text-xs text-steel uppercase tracking-widest mb-1">{producto.category}</p>
          <p className="text-sm font-semibold text-navy leading-snug mb-3 line-clamp-2 flex-1">{producto.title}</p>
          <p className="text-xl font-bold text-lava mb-4">${producto.price}</p>
          <button
            onClick={() => handleAdd(producto.id)}
            className="w-full border border-navy text-navy text-xs py-2 rounded-lg hover:bg-navy hover:text-cream transition-colors duration-200"
          >
            + Seguir producto
          </button>
        </div>
      ))}
    </div>
  </div>
)
}

export default AddProduct

