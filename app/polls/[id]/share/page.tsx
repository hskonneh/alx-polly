import QRCodeCard from '@/app/components/QRCodeCard'
import SocialShareButtons from '@/app/components/SocialShareButtons'
import EmbedCodeCard from '@/app/components/EmbedCodeCard'
import Link from 'next/link'

export default async function SharePollPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { id } = await params
  const pollUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/polls/${id}`
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link 
            href={`/polls/${id}`} 
            className="text-blue-600 hover:text-blue-500 flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Return to Poll
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Share Your Poll
          </h1>
          <p className="mt-2 text-gray-600">
            Multiple ways to spread your poll and get more responses
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          {/* QR Code Section */}
          <QRCodeCard
            pollId={id}
            pollUrl={pollUrl}
            title="Scan & Share QR Code"
          />

          {/* Social Sharing Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mx-auto block">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Social Media Sharing
            </h3>
            <SocialShareButtons 
              pollUrl={pollUrl} 
              title="Check out this awesome poll!" 
            />
          </div>

          {/* Embed Code Section */}
          <EmbedCodeCard pollUrl={pollUrl} />
        </div>
      </div>
    </div>
  );
};