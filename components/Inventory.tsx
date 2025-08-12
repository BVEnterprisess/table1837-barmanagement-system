import { useState, useEffect } from 'react'

interface InventoryItem {
  bottles: number
  ounces: number
  category: string
}

interface InventoryData {
  [key: string]: InventoryItem
}

export default function Inventory() {
  const [inventoryData, setInventoryData] = useState<InventoryData>({})
  const [activeFilter, setActiveFilter] = useState('all')
  const [isListening, setIsListening] = useState(false)
  const [voiceText, setVoiceText] = useState('Listening... Speak your inventory updates')
  const [mounted, setMounted] = useState(false)

  // Complete inventory from the original code
  const inventory = {
    vodka: [
      'Zyr Vodka', '360 Double Chocolate Vodka', 'Western Sun Blueberry Vodka',
      'Absolut', 'Smirnoff Vanilla', 'Smirnoff Citrus', 'Smirnoff Vodka (Regular)',
      'Holla Vodka', 'Tito\'s', 'Gray Goose', 'Double Cross Vodka',
      'Kettle One', 'Kettle One Cucumber and Mint'
    ],
    gin: [
      'Hendrick\'s Gin', 'Bar Hill Gin', 'Whitley Neill Rhubarb and Ginger Gin',
      'Bombay Sapphire Dry Gin', 'Nolet\'s Dry Gin', 'Blue Coat Dry Gin',
      'Tanqueray Dry Gin', 'Beef Eater Dry Gin', 'Aviation American Gin'
    ],
    rum: [
      'Cruzan Blueberry Lemonade Rum', 'Gosling\'s Black Rum', 'Malibu Coconut Rum',
      'Captain Morgan Spiced Rum', 'Bacardi'
    ],
    tequila: [
      '21 Seed Cucumber Jalapeno Tequila', 'Jose Cuervo Silver', 'Jose Cuervo Gold',
      'Casamigos Mezcal', 'Casamigos Blanco', 'Coramino Reposado',
      'Agavales Blood Orange Blanco Tequila'
    ],
    whiskey: [
      'Knob Creek', 'Elijah Craig', 'Angels Envy', 'Dublin', 'Sycamore Rye',
      'Maker\'s Mark', 'Bullet Rye', 'Bullet Bourbon', 'Basil Hayden\'s Malted Rye',
      'Basil Hayden\'s Bourbon', 'Jack Daniels', 'Jim Bean', 'Woodford Reserve',
      'Watershed Distillery Straight Bourbon 4-Year', 'Dubliner', 'Canadian Club',
      'Seagrams Seven', 'Seagram\'s VO', 'Southern Comfort', 'Crown Royal Apple',
      'Crown Royal', 'Jameson', 'Red Breast Single Pot Still Irish Whiskey 12-Year',
      'Chivas', 'Highland Park 12-Year', 'Glenliet 12-Year', 'Glenfiddich 12-Year',
      'Balvini Doublewood 12-Year', 'Glenmorangie 12-Year', 'Macallen 12 Double Cask',
      'Dewars Scotch Whiskey White Label', 'Johnnie Walker Red', 'Johnnie Walker Black'
    ],
    cordials: [
      'Monin Blackberry', 'Monin Lavender', 'Monin Caramel', 'DeKuyper Sour Apple',
      'Peychaud\'s Bitters', 'Aromatic Bitters', 'Angostura Bitters', 'Dry Vermouth',
      'Sweet Vermouth', 'Saint Germain', 'Drambuie', 'Blue Curacao',
      'DeKuyper Butterscotch', 'DeKuyper Melon', 'DeKuyper Razmataz',
      'DeKuyper Watermelon Pucker', 'Jaquin\'s Creme de Cacao', 'Triple Sec',
      'Middle West Spirits Bourbon Cream', 'Disaronno Amaretto', 'Screwball',
      'Kahlua', 'Bailey\'s', 'RumChata', 'Frangelico', 'Sambuca', 'Luxardo',
      'Campari', 'Aperol', 'Cream to Violet', 'Contreau', 'Pama Pomegranate Liqueur'
    ]
  }

  useEffect(() => {
    setMounted(true)
    // Initialize inventory data only on client
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('inventoryData')
      let initialData: InventoryData = {}
      
      if (storedData) {
        initialData = JSON.parse(storedData)
      }
      
      // Initialize any missing items
      Object.keys(inventory).forEach(category => {
        inventory[category as keyof typeof inventory].forEach(item => {
          if (!initialData[item]) {
            initialData[item] = {
              bottles: 0,
              ounces: 0,
              category: category
            }
          }
        })
      })
      
      setInventoryData(initialData)
    }
  }, [])

  const updateInventoryItem = (item: string, type: 'bottles' | 'ounces', value: number) => {
    const newData = {
      ...inventoryData,
      [item]: {
        ...inventoryData[item],
        [type]: value
      }
    }
    setInventoryData(newData)
  }

  const saveInventory = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('inventoryData', JSON.stringify(inventoryData))
      alert('Inventory updated successfully!')
    }
  }

  const toggleVoiceRecognition = () => {
    // Voice recognition would be implemented here
    setIsListening(!isListening)
    if (!isListening) {
      setVoiceText('Listening... Speak your inventory updates')
    } else {
      setVoiceText('Voice recognition stopped')
    }
  }

  const filteredCategories = activeFilter === 'all' 
    ? Object.keys(inventory) 
    : [activeFilter]

  if (!mounted) {
    return (
      <div className="inventory-bg min-h-screen p-6">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-8">Loading Inventory...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="inventory-bg min-h-screen p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">Inventory Management</h2>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={toggleVoiceRecognition}
              className={`btn-primary px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                isListening ? 'bg-red-600' : ''
              }`}
            >
              <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'}`}></i>
              {isListening ? 'Stop Listening' : 'Voice Update'}
            </button>
            <button 
              onClick={saveInventory}
              className="bg-darker-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              <i className="fas fa-sync mr-2"></i>
              Update Inventory
            </button>
          </div>
        </div>
        
        {/* Voice Recognition Status */}
        {isListening && (
          <div className="glass-panel p-4 rounded-lg mb-6">
            <div className="flex items-center gap-3">
              <i className="fas fa-microphone recording text-red-500"></i>
              <span>{voiceText}</span>
            </div>
          </div>
        )}
        
        {/* Category Filter */}
        <div className="glass-panel p-4 rounded-lg mb-6 overflow-x-auto">
          <div className="flex gap-4 flex-nowrap min-w-max">
            {['all', 'vodka', 'gin', 'rum', 'tequila', 'whiskey', 'cordials'].map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium capitalize ${
                  activeFilter === category 
                    ? 'bg-dark-green' 
                    : 'bg-gray-700 hover:bg-dark-green'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Inventory Grid */}
        <div className="inventory-grid">
          {filteredCategories.map(category => (
            <div key={category} className="col-span-full">
              <h3 className="text-2xl font-bold mb-4 text-center capitalize text-yellow-400">
                {category}
              </h3>
              {inventory[category as keyof typeof inventory].map(item => {
                const data = inventoryData[item] || { bottles: 0, ounces: 0, category }
                return (
                  <div key={item} className="inventory-item mb-4">
                    <h4 className="font-semibold mb-3">{item}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-300 mb-1">Bottles</label>
                        <input 
                          type="number" 
                          value={data.bottles}
                          onChange={(e) => updateInventoryItem(item, 'bottles', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-black bg-opacity-50 border border-gray-600 rounded focus:outline-none focus:border-green-600 text-white" 
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-300 mb-1">Ounces</label>
                        <input 
                          type="number" 
                          value={data.ounces}
                          onChange={(e) => updateInventoryItem(item, 'ounces', parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-black bg-opacity-50 border border-gray-600 rounded focus:outline-none focus:border-green-600 text-white" 
                          min="0"
                          step="0.1"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}