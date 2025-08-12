import { useState, useEffect } from 'react'

interface Item86 {
  name: string
  timestamp: string
  addedBy: string
}

export default function Staff() {
  const [items86, setItems86] = useState<Item86[]>([])
  const [newItem, setNewItem] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const stored86Items = localStorage.getItem('items86')
      if (stored86Items) {
        setItems86(JSON.parse(stored86Items))
      }
    }
  }, [])

  const add86Item = () => {
    if (newItem.trim() && typeof window !== 'undefined') {
      const newItems = [...items86, {
        name: newItem.trim(),
        timestamp: new Date().toLocaleString(),
        addedBy: 'Current User'
      }]
      setItems86(newItems)
      localStorage.setItem('items86', JSON.stringify(newItems))
      setNewItem('')
    }
  }

  const remove86Item = (index: number) => {
    if (typeof window !== 'undefined') {
      const newItems = items86.filter((_, i) => i !== index)
      setItems86(newItems)
      localStorage.setItem('items86', JSON.stringify(newItems))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      add86Item()
    }
  }

  if (!mounted) {
    return (
      <div className="staff-bg min-h-screen p-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Loading Staff...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="staff-bg min-h-screen p-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Staff Communication</h2>
        
        {/* Add 86'd Items */}
        <div className="glass-panel p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Add 86'd Item</h3>
          <div className="flex gap-4">
            <input 
              type="text" 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-2 bg-black bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-green-600 text-white" 
              placeholder="Enter item name" 
            />
            <button 
              onClick={add86Item}
              className="btn-primary px-6 py-2 rounded-lg font-semibold"
            >
              Add to 86'd List
            </button>
          </div>
        </div>
        
        {/* Current 86'd Items */}
        <div className="glass-panel p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Current 86'd Items</h3>
          <div className="space-y-2">
            {items86.length === 0 ? (
              <p className="text-gray-400">No items currently 86'd</p>
            ) : (
              items86.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-red-900 bg-opacity-30 border border-red-600 rounded-lg">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">Added: {item.timestamp}</p>
                  </div>
                  <button 
                    onClick={() => remove86Item(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Staff Contacts */}
        <div className="glass-panel p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-6">Staff Contacts</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-black bg-opacity-30 rounded-lg">
              <i className="fas fa-user-tie text-3xl mb-3 text-yellow-400"></i>
              <h4 className="font-bold text-lg">Bar Manager</h4>
              <p className="text-lg">Jason</p>
              <a href="tel:7176594430" className="text-green-400 hover:text-green-300 text-lg">
                (717) 659-4430
              </a>
            </div>
            
            <div className="text-center p-4 bg-black bg-opacity-30 rounded-lg">
              <i className="fas fa-cocktail text-3xl mb-3 text-yellow-400"></i>
              <h4 className="font-bold text-lg">Bartender</h4>
              <p className="text-lg">John</p>
              <a href="tel:7178588338" className="text-green-400 hover:text-green-300 text-lg">
                (717) 858-8338
              </a>
            </div>
            
            <div className="text-center p-4 bg-black bg-opacity-30 rounded-lg">
              <i className="fas fa-wine-glass text-3xl mb-3 text-yellow-400"></i>
              <h4 className="font-bold text-lg">Bartender</h4>
              <p className="text-lg">Ivana</p>
              <a href="tel:7174954252" className="text-green-400 hover:text-green-300 text-lg">
                (717) 495-4252
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}