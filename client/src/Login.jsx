import { useState } from 'react'
import axios from 'axios'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    const response = await axios.post(`http://localhost:3000/api/auth/login`, {
        email: email,
        password: password
    })
    
    const token = response.data
    onLogin(token)
  }

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Entrar</button>
    </div>
  )
}

export default Login