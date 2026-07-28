import { useState, useEffect } from 'react'
import axios from 'axios'

const AlertList = ({ token, productId }) => {
  const [alertas, setAlert] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/alertas?productId=${productId}`, {
              headers: { Authorization: `Bearer ${token}` }
      })
        setAlert(response.data.slice(-5).reverse())
        }catch (error){
            setError('Error al cargar las alertas')
        }finally{
            setLoading(false)
        }
      
    }
    fetchData()
  }, [productId])

  if (loading) return <p className="text-steel text-sm">Cargando alertas...</p>
  if (error) return <p className="text-red text-sm">{error}</p>

  return (
    <div className="grid grid-cols-5 gap-3 mt-2">
      {alertas.map(alerta => (
        <div key={alerta.id} className="bg-white border border-steel/20 rounded-xl p-4">
          <p className="text-xs text-navy uppercase tracking-widest mb-1">Precio mínimo</p>
          <p className="text-2xl font-bold text-lava">${alerta.price}</p>
          <p className="text-xs text-navy/70 mt-2">{new Date(alerta.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  )
}

export default AlertList