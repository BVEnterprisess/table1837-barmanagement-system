import { useState } from 'react'

interface OCRData {
  redWine: any
  whiteWine: any
  starters: string[]
  entrees: string[]
  cocktail: any
}

export default function Admin() {
  const [ocrData, setOcrData] = useState<OCRData>({
    redWine: null,
    whiteWine: null,
    starters: [],
    entrees: [],
    cocktail: null
  })
  const [showPreview, setShowPreview] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [previewSrc, setPreviewSrc] = useState('')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewSrc(event.target?.result as string)
        setShowPreview(true)
        setShowResult(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const processOCR = () => {
    // Simulate OCR processing with timeout
    setShowResult(true)
    
    setTimeout(() => {
      const simulatedData = {
        redWine: {
          name: "INSIGNIA, JOSEPH PHELPS ESTATE",
          region: "Napa Valley, CA, 2014",
          price: "$305",
          code: "R051"
        },
        whiteWine: {
          name: "RAMEY, RUSSIAN RIVER VALLEY",
          region: "California, 2021",
          price: "$120",
          code: "C016"
        },
        starters: [
          "House-Made Charcuterie Board with Artisanal Cheeses",
          "Seared Sea Scallops with Citrus Beurre Blanc"
        ],
        entrees: [
          "Pan-Seared Duck Breast with Cherry Reduction",
          "Wild Mushroom Risotto with Black Truffle"
        ],
        cocktail: {
          name: "Barrel-Aged Manhattan",
          description: "Aged bourbon, sweet vermouth, bitters",
          price: "$14"
        }
      }
      setOcrData(simulatedData)
    }, 1500)
  }

  const applyOCRResults = () => {
    // In a real app, this would update the dashboard
    alert('Dashboard updated successfully with OCR data!')
    setShowPreview(false)
    setShowResult(false)
    setPreviewSrc('')
  }

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('senderName') as string
    const subject = formData.get('messageSubject') as string
    const body = formData.get('messageBody') as string
    
    const mailtoLink = `mailto:info@table1837.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\n\n${body}`)}`
    window.location.href = mailtoLink
    
    e.currentTarget.reset()
    alert('Email client opened. Please send the message from your email application.')
  }

  return (
    <div className="admin-bg min-h-screen p-6">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Admin Contact</h2>
        
        {/* Admin Contact Info */}
        <div className="glass-panel p-6 rounded-lg mb-8">
          <div className="text-center p-6">
            <i className="fas fa-wine-bottle text-5xl mb-4 text-yellow-400"></i>
            <h3 className="text-2xl font-bold mb-2">Wine Steward / Maître d'hôtel</h3>
            <p className="text-xl mb-4">Graeson</p>
            <a href="tel:7176836763" className="text-green-400 hover:text-green-300 text-xl">
              (717) 683-6763
            </a>
          </div>
        </div>
        
        {/* OCR Upload Tool */}
        <div className="glass-panel p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold mb-4">Fresh Features OCR Tool</h3>
          <p className="text-gray-300 mb-4">Upload a photo of the Fresh Features paper to automatically extract information and update the dashboard.</p>
          
          <div className="mb-6">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="ocrFileUpload" className="flex flex-col w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-black bg-opacity-50 hover:bg-opacity-70">
                <div className="flex flex-col items-center justify-center pt-7">
                  <i className="fas fa-cloud-upload-alt text-2xl text-yellow-400"></i>
                  <p className="pt-1 text-sm tracking-wider text-gray-300">Upload image or take photo</p>
                </div>
                <input 
                  id="ocrFileUpload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
          
          {showPreview && (
            <div className="mb-6">
              <h4 className="font-bold mb-2">Image Preview:</h4>
              <div className="flex justify-center">
                <img src={previewSrc} className="max-h-60 rounded-lg" alt="Upload preview" />
              </div>
              <button 
                onClick={processOCR}
                className="w-full btn-primary py-3 px-6 rounded-lg font-semibold mt-4"
              >
                <i className="fas fa-magic mr-2"></i> Process Image
              </button>
            </div>
          )}
          
          {showResult && (
            <div>
              <h4 className="font-bold mb-2">Extracted Information:</h4>
              <div className="bg-black bg-opacity-60 p-4 rounded-lg text-sm max-h-60 overflow-y-auto">
                {ocrData.redWine && (
                  <>
                    <h4 className="font-bold text-yellow-400 mb-2">Featured Wines:</h4>
                    <p><span className="font-semibold">Red:</span> {ocrData.redWine.name} - {ocrData.redWine.price} ({ocrData.redWine.code})</p>
                    <p><span className="font-semibold">White:</span> {ocrData.whiteWine.name} - {ocrData.whiteWine.price} ({ocrData.whiteWine.code})</p>
                    
                    <h4 className="font-bold text-yellow-400 mt-4 mb-2">Starters:</h4>
                    <ul className="list-disc pl-4 mb-2">
                      {ocrData.starters.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                    
                    <h4 className="font-bold text-yellow-400 mt-4 mb-2">Entrees:</h4>
                    <ul className="list-disc pl-4 mb-2">
                      {ocrData.entrees.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                    
                    <h4 className="font-bold text-yellow-400 mt-4 mb-2">Featured Cocktail:</h4>
                    <p>{ocrData.cocktail.name} - {ocrData.cocktail.price}</p>
                    <p className="text-sm text-gray-400">{ocrData.cocktail.description}</p>
                  </>
                )}
              </div>
              <div className="flex justify-end mt-4">
                <button 
                  onClick={applyOCRResults}
                  className="btn-primary py-2 px-4 rounded-lg font-semibold"
                >
                  <i className="fas fa-check mr-2"></i> Apply Changes
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Message Form */}
        <div className="glass-panel p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Send Message to Management</h3>
          <form onSubmit={handleMessageSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input 
                type="text" 
                name="senderName"
                className="w-full px-4 py-2 bg-black bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-green-600 text-white" 
                required 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input 
                type="text" 
                name="messageSubject"
                className="w-full px-4 py-2 bg-black bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-green-600 text-white" 
                required 
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea 
                name="messageBody"
                rows={6} 
                className="w-full px-4 py-2 bg-black bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-green-600 text-white" 
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full btn-primary py-3 px-6 rounded-lg font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}