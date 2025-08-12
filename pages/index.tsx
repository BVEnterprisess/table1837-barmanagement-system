import { useState } from 'react'
import Layout from '../components/Layout'
import Login from '../components/Login'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import Staff from '../components/Staff'
import Admin from '../components/Admin'
import Wine from '../components/Wine'
import Inventory from '../components/Inventory'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveTab('dashboard')
  }

  const renderTabContent = () => {
    switch (activeTab) {
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
    <Layout>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            onLogout={handleLogout} 
          />
          {renderTabContent()}
        </>
      )}
    </Layout>
  )
}