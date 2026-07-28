import { useState } from 'react'
import axios from 'axios'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [modo, setModo] = useState('login')

 const handleSubmit = async () => {
    console.log('handleSubmit ejecutado', email, password)

  try {
    const url = modo === 'login' 
      ? 'http://localhost:3000/api/auth/login'
      : 'http://localhost:3000/api/auth/register'
    
    const response = await axios.post(url, { email, password })
    console.log('response.data:', response.data)

    onLogin(response.data)
  } catch (e) {
    console.log('error:', e)
    setError(modo === 'login' ? 'Email o contraseña incorrectos' : 'Error al crear la cuenta')
  }
}

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold text-navy mb-2 tracking-tight">Price Tracker</h1>
        <p className="text-steel mb-10 text-sm">Sigue precios. Compra en el momento justo.</p>
        <div className="bg-white border border-steel/20 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-navy mb-6">Iniciar sesión</h2>
          {error && <p className="text-red mb-4 text-sm">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-steel/30 rounded-lg px-4 py-3 mb-4 text-navy placeholder-steel/50 focus:outline-none focus:border-steel text-sm"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-steel/30 rounded-lg px-4 py-3 mb-6 text-navy placeholder-steel/50 focus:outline-none focus:border-steel text-sm"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-navy text-cream py-3 rounded-lg font-medium hover:bg-lava transition-colors duration-200 text-sm"
          >
            {modo === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
          <button
            onClick={() => setModo(modo === 'login' ? 'register' : 'login')}
            className="w-full text-center text-xs text-steel hover:text-navy mt-4 transition-colors"
          >
            {modo === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login