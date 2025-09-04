'use client'

interface EmbedCodeCardProps {
  pollUrl: string
}

export default function EmbedCodeCard({ pollUrl }: EmbedCodeCardProps) {
  const embedCode = `<iframe src="${pollUrl}" width="100%" height="500" frameBorder="0" style="border:none;"></iframe>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Embed on Website
      </h3>
      <div>
        <p className="text-sm text-gray-600 mb-2">
          Copy this code to embed the poll on your website:
        </p>
        <div className="relative">
          <textarea
            value={embedCode}
            readOnly
            rows={4}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 font-mono text-gray-800"
            aria-label="Embed code for poll"
          />
          <button 
            onClick={handleCopy}
            className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}
