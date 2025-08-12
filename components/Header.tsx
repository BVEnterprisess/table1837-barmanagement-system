interface HeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onLogout: () => void
}

export default function Header({ activeTab, onTabChange, onLogout }: HeaderProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'staff', label: 'Staff' },
    { id: 'admin', label: 'Admin' },
    { id: 'wine', label: 'Wine' },
    { id: 'inventory', label: 'Inventory' }
  ]

  return (
    <header className="bg-black bg-opacity-90 backdrop-filter backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold">TABLE 1837</h1>
            <p className="text-sm text-gray-400">Bar Management</p>
          </div>
        </div>
        
        <nav className="flex space-x-1 mt-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-tab px-4 py-2 rounded-t-lg text-sm font-medium ${
                activeTab === tab.id ? 'active' : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button 
            onClick={onLogout}
            className="nav-tab px-4 py-2 rounded-t-lg text-sm font-medium ml-auto"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}