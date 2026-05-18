import { useState, useEffect } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const PriceChart = ({ productId }) => {
  const [historial, setHistorial] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:3000/api/productos/${productId}/historial`)
        setHistorial(response.data)
    }
    fetchData()
  }, [productId])

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