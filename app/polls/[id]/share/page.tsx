import QRCodeCard from '@/app/components/QRCodeCard'
import Link from 'next/link'

export default function SharePollPage({ params }: { params: { id: string } }) {
  const pollUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/polls/${params.id}`
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href={`/polls/${params.id}`} className="text-blue-600 hover:text-blue-500">
            ← Back to Poll
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Share Poll</h1>
          <p className="mt-2 text-gray-600">
            Share this poll with others using the QR code or direct link
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <QRCodeCard
            pollId={params.id}
            pollUrl={pollUrl}
            title="Share Poll"
          />
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sharing Options</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Direct Link</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Copy and paste this link to share the poll:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pollUrl}
                    readOnly
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(pollUrl)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Social Media</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-3 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Share on WhatsApp
                  </button>
                  <button className="p-3 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Share on Twitter
                  </button>
                  <button className="p-3 text-sm bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors">
                    Share on Facebook
                  </button>
                  <button className="p-3 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Share on Email
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Embed Code</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Embed this poll on your website:
                </p>
                <textarea
                  value={`<iframe src="${pollUrl}" width="100%" height="400" frameborder="0"></iframe>`}
                  readOnly
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
