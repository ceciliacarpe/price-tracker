import { useState, useEffect } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const PriceChart = ({ productId }) => {
  const [historial, setHistorial] = useState([])
  const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/productos/${productId}/historial`)
        setHistorial(response.data)
      } catch (error) {
        setError('Error al cargar el historial de precios')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [productId])

  if (loading) return <p className="text-steel text-sm">Cargando historial de precios...</p>
  if (error) return <p className="text-red text-sm">{error}</p>

  return (
    <div>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historial}>
                <XAxis dataKey="recordedAt" hide={true} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#2563eb" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  )
}

export default PriceChart