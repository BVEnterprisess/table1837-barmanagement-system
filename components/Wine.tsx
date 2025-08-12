import { useState } from 'react'

interface WineItem {
  name: string
  region: string
  price: string
  code: string
}

export default function Wine() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  const wineData = {
    red: {
      'PINOT NOIR': [
        { name: 'CRISTOM, EILEEN VY.D., EOLA-AMITY HILLS', region: 'Willamette Valley, OR, 2019', price: '$185', code: 'R013' },
        { name: 'CRISTOM, JESSIE VYD., EOLA-AMITY HILLS', region: 'Willamette Valley, OR, 2020', price: '$199', code: 'R059' },
        { name: 'ENROUTE, LES PONNIERS VYD.', region: 'Russian River Valley, CA, 2020', price: '$105', code: 'R042' },
        { name: 'BRAVIUM', region: 'Alexander Valley, CA, 2021', price: '$95', code: 'R024' },
        { name: 'CLOS DE LA TECH', region: 'Santa Cruz Mountain Estates, CA, 2017', price: '$66', code: 'R042' }
      ],
      'MERLOT': [
        { name: 'RUTHERFORD FAMILY WINERY', region: 'Monterey, CA, 2019', price: '$90', code: 'R012' },
        { name: 'SUBSTANCE, VYD. COLLECTION', region: 'Stoneridge Vyd., WA, 2018', price: '$80', code: 'R009' },
        { name: 'POST & BEAM', region: 'Napa Valley, 2019', price: '$150', code: 'R021' },
        { name: 'RODALE, COTARELLA', region: 'Lazio, IGT, Italy, 2019', price: '$70', code: 'R005' },
        { name: 'CLINE FAMILY CELLARS', region: 'Seven Ranchlands, Sonoma County, CA, 2020', price: '$72', code: 'R054' }
      ],
      'CABERNET SAUVIGNON': [
        { name: 'NEYERS', region: 'Napa Valley, 2018', price: '$165', code: 'R071' },
        { name: 'PENFOLDS BIN 407', region: 'South Australia, 2019', price: '$145', code: 'R011' },
        { name: 'SHAFER CELLARS, FOUR PLACES', region: 'Red Mountain AVA, Washington, 2019', price: '$124', code: 'R017' },
        { name: 'CAKEBREAD CELLARS', region: 'Napa Valley, 2021', price: '$250', code: 'R070' }
      ]
    },
    white: {
      'CHARDONNAY': [
        { name: 'ALLEGRO STEEL', region: 'Brogue, PA, 2016', price: '$58', code: '101A' },
        { name: 'NEYERS', region: 'Carneros District, Sonoma County, CA, 2019', price: '$100', code: 'C004' },
        { name: 'WORKS & DAYS', region: 'Sonoma Coast, CA, 2019', price: '$102', code: 'C009' },
        { name: 'CRISTOM', region: 'Eola-Amity Hills, Willamette Valley, WA, 2019', price: '$95', code: '404A' },
        { name: 'CAKEBREAD CELLARS', region: 'Napa Valley, 2021', price: '$115', code: 'C015' },
        { name: 'RAMEY', region: 'Russian River Valley, CA, 2021', price: '$120', code: 'C016' }
      ]
    },
    sparkling: {
      'CHAMPAGNE': [
        { name: 'MOET & CHANDON', region: 'Imperial, Brut, France, NV', price: '$110', code: '501A' },
        { name: 'VEUVE CLICQUOT', region: 'Yellow Label, Brut, France NV', price: '$135', code: '503A' },
        { name: 'PERRIER-JOUET', region: 'Grand Brut, France, NV', price: '$145', code: '506A' },
        { name: 'NICOLAS FEUILLATTE', region: 'Brut Reserve, France, NV', price: '$110', code: '505A' }
      ]
    }
  }

  const shouldShowCategory = (categoryType: string) => {
    if (filterCategory && filterCategory !== categoryType) return false
    if (!searchTerm) return true
    
    const categoryData = wineData[categoryType as keyof typeof wineData]
    return Object.values(categoryData).some(wines => 
      wines.some(wine => 
        wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wine.region.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  return (
    <div className="wine-bg min-h-screen p-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Wine Collection</h2>
        
        {/* Search and Filter */}
        <div className="glass-panel p-4 rounded-lg mb-8">
          <div className="flex flex-wrap gap-4">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 bg-black bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-green-600 text-white" 
              placeholder="Search wines..." 
            />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-black bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-green-600 text-white"
            >
              <option value="">All Categories</option>
              <option value="red">Red Wines</option>
              <option value="white">White Wines</option>
              <option value="sparkling">Sparkling & Champagne</option>
            </select>
          </div>
        </div>
        
        {/* Wine Categories */}
        <div>
          {/* Red Wines */}
          {shouldShowCategory('red') && (
            <>
              {Object.entries(wineData.red).map(([variety, wines]) => (
                <div key={variety} className="wine-category red-wine">
                  <h3 className="text-2xl font-bold mb-4 text-red-400">{variety}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {wines.map((wine, index) => (
                      <div key={index} className="wine-item">
                        <p className="font-semibold">{wine.name}</p>
                        <p className="text-sm text-gray-300">{wine.region}</p>
                        <p className="text-lg font-bold text-yellow-400">{wine.price} <span className="text-sm">({wine.code})</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
          
          {/* White Wines */}
          {shouldShowCategory('white') && (
            <>
              {Object.entries(wineData.white).map(([variety, wines]) => (
                <div key={variety} className="wine-category white-wine">
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">{variety}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {wines.map((wine, index) => (
                      <div key={index} className="wine-item">
                        <p className="font-semibold">{wine.name}</p>
                        <p className="text-sm text-gray-300">{wine.region}</p>
                        <p className="text-lg font-bold text-yellow-400">{wine.price} <span className="text-sm">({wine.code})</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
          
          {/* Sparkling & Champagne */}
          {shouldShowCategory('sparkling') && (
            <>
              {Object.entries(wineData.sparkling).map(([variety, wines]) => (
                <div key={variety} className="wine-category sparkling-wine">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">{variety}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {wines.map((wine, index) => (
                      <div key={index} className="wine-item">
                        <p className="font-semibold">{wine.name}</p>
                        <p className="text-sm text-gray-300">{wine.region}</p>
                        <p className="text-lg font-bold text-yellow-400">{wine.price} <span className="text-sm">({wine.code})</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}