'use client'

import React, { useState, useEffect } from 'react'
import Login from '../components/Login'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import Staff from '../components/Staff'
import Admin from '../components/Admin'
import Wine from '../components/Wine'
import Inventory from '../components/Inventory'

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState('dashboard')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser')
      if (user) {
        setCurrentUser(user)
      }
    }
  }, [])

  const handleLogin = (email: string) => {
    setCurrentUser(email)
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', email)
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser')
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-amber-800">Loading...</div>
      </div>
    )
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'staff':
        return <Staff />
      case 'admin':
        return <Admin />
      case 'wine':
        return <Wine />
      case 'inventory':
        return <Inventory />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        onLogout={handleLogout}
      />
      <main className="pt-20">
        {renderContent()}
      </main>
    </div>
  )
}