'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { generateQRCode } from '@/lib/utils/qr-code'
import { Button } from '@/app/components/ui/button'
import ShareButton from '@/app/components/ShareButton'

interface QRCodeCardProps {
  pollId: string
  pollUrl: string
  title?: string
}

/**
 * QRCodeCard
 * ----------
 * Generates and displays a QR code for a poll URL. It uses the
 * `generateQRCode` helper (which returns a data URL) and renders the
 * resulting image via Next.js `Image` component.
 *
 * Where used:
 * - Poll sharing page: `app/polls/[id]/share/page.tsx` to allow users to
 *   download or share the QR code image.
 */
export default function QRCodeCard({ 
  pollId, 
  pollUrl, 
  title = 'Share Poll' 
}: QRCodeCardProps) {
  const [qrCodeDataUrl, setQRCodeDataUrl] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Generate a QR code data URL when pollUrl changes. This is an async
    // one-time side-effect for this component instance.
    async function fetchQRCode() {
      try {
        setError('')
        const dataUrl = await generateQRCode(pollUrl)
        if (!dataUrl) {
          throw new Error('Failed to generate QR code')
        }
        setQRCodeDataUrl(dataUrl)
      } catch (error) {
        console.error('QR Code Generation Failed:', error)
        setError('Failed to generate QR code. Please try again later.')
      }
    }

    fetchQRCode()
  }, [pollUrl])

  // Allow downloading the generated data URL as a PNG file
  const handleQRCodedownload = () => {
    if (!qrCodeDataUrl) return

    try {
      const link = document.createElement('a')
      link.href = qrCodeDataUrl
      link.download = `poll-qr-${pollId}.png`
      link.click()
    } catch (error) {
      console.error('Download failed:', error)
      setError('Failed to download QR code. Please try again.')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h3>

      {error ? (
        <div className="flex justify-center items-center h-64 text-red-500">
          <p>{error}</p>
        </div>
      ) : qrCodeDataUrl ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-64 h-64">
            <Image 
              src={qrCodeDataUrl} 
              alt="Poll QR Code" 
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className=" space-x-4">
            <Button className="cursor-pointer mx-auto block"
              onClick={handleQRCodedownload}
              variant="outline"
            >
              Download QR Code
            </Button>

            <ShareButton className="text-gray-900 cursor-pointer mx-auto block"
              textToCopy={pollUrl}
              buttonText="Share Poll"
              title="Check out this poll!"
              url={pollUrl}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Generating QR Code...</p>
        </div>
      )}
    </div>
  )
};