import { useState, useEffect } from 'react'
import axios from 'axios'

const AlertList= ({ token }) => {
  const [alertas, setAlert] = useState([])

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get(`http://localhost:3000/api/alertas`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setAlert(response.data)
    }
    fetchData()
  }, [])

  return (
    <div>
        {alertas.map(alerta => (
        <div key={alerta.id}>
            <p>Precio: {alerta.price}</p>
            <p>Fecha: {new Date(alerta.createdAt).toLocaleDateString()}</p>
        </div>
        ))}
    </div>
)
}

export default AlertList