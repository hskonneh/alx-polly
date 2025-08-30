'use client'

interface QRCodeCardProps {
  pollId: string
  pollUrl: string
  title?: string
}

export default function QRCodeCard({ pollId, pollUrl, title = "Share Poll" }: QRCodeCardProps) {
  // Placeholder QR code - in real implementation, you'd use a QR code library
  const qrCodePlaceholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <text x="100" y="100" text-anchor="middle" dy=".3em" font-family="monospace" font-size="12">QR Code</text>
      <text x="100" y="120" text-anchor="middle" dy=".3em" font-family="monospace" font-size="8">${pollId}</text>
    </svg>
  `)}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pollUrl)
      // TODO: Add toast notification
      console.log('URL copied to clipboard')
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
      
      <div className="text-center mb-4">
        <div className="inline-block p-4 bg-gray-50 rounded-lg">
          <img
            src={qrCodePlaceholder}
            alt="QR Code"
            className="w-32 h-32 mx-auto"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Poll URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pollUrl}
              readOnly
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50"
            />
            <button
              onClick={copyToClipboard}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-2">
            Scan the QR code or share the URL to let others vote
          </p>
          <div className="flex justify-center gap-2">
            <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              WhatsApp
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
