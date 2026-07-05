import { useState, useEffect } from 'react'
import axios from 'axios'

const AlertList = ({ token }) => {
  const [alertas, setAlert] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/alertas', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAlert(response.data.slice(-5).reverse())
    }
    fetchData()
  }, [])

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