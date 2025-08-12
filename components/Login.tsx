import { useState } from 'react'

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.toLowerCase() === 'user@table1837.com' && password === 'password123') {
      onLogin()
    } else {
      alert('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="login-bg min-h-screen flex items-center justify-center">
      <div className="glass-panel p-8 rounded-lg w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">TABLE 1837</h1>
          <p className="text-gray-300 text-lg">Glen Rock Mill Inn</p>
          <p className="text-gray-400">Bar Management System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input 
              type="email" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-black bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-green-600 text-white" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-green-600 text-white" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full btn-primary text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-opacity-80 transition duration-300"
          >
            ACCESS INVENTORY SYSTEM
          </button>
          
          <div className="text-center text-sm text-gray-400">
            <p>Demo Credentials:</p>
            <p>user@table1837.com / password123</p>
          </div>
        </form>
      </div>
    </div>
  )
}