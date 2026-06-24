import { useState, useEffect } from 'react'
import axios from 'axios'

const ProductList= ({ token, onSelect }) => {
  const [productos, setProductList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        console.log('token:', token)

        const response = await axios.get(`http://localhost:3000/api/productos/mis-productos`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
    
        })
        setProductList(response.data)
    }
    fetchData()
  }, [])

  return (
    <div>
        {productos.map(producto => (
        <div key={producto.id} onClick={() => onSelect(producto.id)}>
            <p>Producto: {producto.name} </p>
        </div>
        ))}
    </div>
)
}

export default ProductList