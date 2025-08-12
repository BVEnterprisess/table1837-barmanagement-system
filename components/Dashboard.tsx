import { useEffect, useState } from 'react'

interface Item86 {
  name: string
  timestamp: string
  addedBy: string
}

interface SpecialType {
  title: string
  time: string
  description: string
  price: string
}

export default function Dashboard() {
  const [items86, setItems86] = useState<Item86[]>([])
  const [todaySpecial, setTodaySpecial] = useState<SpecialType | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load 86'd items from localStorage only on client
    if (typeof window !== 'undefined') {
      const stored86Items = localStorage.getItem('items86')
      if (stored86Items) {
        setItems86(JSON.parse(stored86Items))
      }
    }

    // Set today's special based on day of week
    updateTodaySpecial()
  }, [])

  const updateTodaySpecial = () => {
    const today = new Date().getDay()
    const specials: { [key: number]: SpecialType } = {
      0: { // Sunday
        title: "Sunday Steak Night",
        time: "4p – 8p",
        description: "Garden Salad • Steak Frites • Glass of House Wine",
        price: "$40"
      },
      3: { // Wednesday
        title: "Date Night",
        time: "4p – 8p", 
        description: "2-Dine for $89 • 3-Course Menu • $5 Draft Beer • $10 House Wine",
        price: "$89"
      },
      4: { // Thursday
        title: "1837 Bar & Burger Night",
        time: "4p – 8p",
        description: "$12.50 Signature Burger OR Crispy Chicken • $5 Draft Beer • $10 House Wine",
        price: "$12.50"
      },
      5: { // Friday
        title: "Late Night Happy Hour",
        time: "8p – 11p",
        description: "$5 Draft Beer • $10 House Wines • $10 House Winner Cocktails • $2 Off Curated Cocktails",
        price: "Various"
      },
      6: { // Saturday
        title: "Late Night Happy Hour", 
        time: "8p – 11p",
        description: "$5 Draft Beer • $10 House Wines • $10 House Winner Cocktails • $2 Off Curated Cocktails",
        price: "Various"
      }
    }

    setTodaySpecial(specials[today] || null)
  }

  if (!mounted) {
    return (
      <div className="dashboard-bg min-h-screen p-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Loading Dashboard...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-bg min-h-screen p-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Daily Dashboard</h2>
        
        {/* Featured Wines of the Week */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="featured-wine">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <i className="fas fa-wine-glass-alt mr-2 text-yellow-400"></i>
              Featured Red Wine
            </h3>
            <p className="text-lg font-semibold">CRISTOM, EILEEN VYD., PINOT NOIR</p>
            <p className="text-gray-300">Eola-Amity Hills, Willamette Valley, OR, 2019</p>
            <p className="text-2xl font-bold text-yellow-400 mt-2">$185</p>
            <p className="text-sm text-gray-400">(R013)</p>
          </div>
          
          <div className="featured-wine">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <i className="fas fa-wine-glass-alt mr-2 text-yellow-400"></i>
              Featured White Wine
            </h3>
            <p className="text-lg font-semibold">NEYERS, CARNEROS CHARDONNAY</p>
            <p className="text-gray-300">Sonoma County, CA, 2019</p>
            <p className="text-2xl font-bold text-yellow-400 mt-2">$100</p>
            <p className="text-sm text-gray-400">(C004)</p>
          </div>
        </div>
        
        {/* 86'd Items Alert */}
        <div className="alert-86 mb-8">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            86'd Items
          </h3>
          <div>
            {items86.length === 0 ? (
              <p className="text-gray-300">No items currently 86'd</p>
            ) : (
              items86.map((item, index) => (
                <div key={index} className="mb-2">
                  <span className="font-semibold text-red-300">{item.name}</span>
                  <span className="text-sm text-gray-400 ml-2">- {item.timestamp}</span>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Food Specials */}
        <div className="food-special-card mb-8">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <i className="fas fa-utensils mr-2 text-yellow-400"></i>
            Food Specials
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-bold text-yellow-400">Hors d'oeuvre</h4>
              <p className="text-gray-300">Salmon Tartare with Avocado Mousse</p>
            </div>
            <div>
              <h4 className="font-bold text-yellow-400">Intermezzo</h4>
              <p className="text-gray-300">Lemon Basil Sorbet</p>
            </div>
            <div>
              <h4 className="font-bold text-yellow-400">Soup of the Day</h4>
              <p className="text-gray-300">Wild Mushroom Bisque</p>
            </div>
          </div>
        </div>
        
        {/* Today's Special */}
        <div className="special-card">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <i className="fas fa-glass-martini mr-2 text-yellow-400"></i>
            Happy Hour Special
          </h3>
          <div>
            {todaySpecial ? (
              <>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-bold">{todaySpecial.title}</h4>
                  <span className="text-lg font-bold text-yellow-400">{todaySpecial.price}</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{todaySpecial.time}</p>
                <p className="text-gray-300">{todaySpecial.description}</p>
              </>
            ) : (
              <p className="text-gray-300">No special offerings today. Check back tomorrow!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}