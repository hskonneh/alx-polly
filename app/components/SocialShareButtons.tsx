// File: /app/components/SocialShareButtons.tsx
'use client'

import { useState } from 'react'
import { 
  WhatsappShareButton, 
  TwitterShareButton, 
  FacebookShareButton, 
  EmailShareButton,
  WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
  EmailIcon
} from 'react-share'

interface SocialShareButtonsProps {
  pollUrl: string
  title?: string
}

export default function SocialShareButtons({ 
  pollUrl, 
  title = 'Check out this poll!' 
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const socialButtonStyle = "rounded-full hover:opacity-80 transition-opacity"
  const iconSize = 40

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pollUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="space-x-4 items-center ">
        <WhatsappShareButton url={pollUrl} title={title}>
          <WhatsappIcon size={iconSize} round className={socialButtonStyle} />
        </WhatsappShareButton>

        <TwitterShareButton url={pollUrl} title={title}>
          <TwitterIcon size={iconSize} round className={socialButtonStyle} />
        </TwitterShareButton>

        <FacebookShareButton url={pollUrl} quote={title}>
          <FacebookIcon size={iconSize} round className={socialButtonStyle} />
        </FacebookShareButton>

        <EmailShareButton 
          url={pollUrl} 
          subject={title}
          body="I wanted to share this interesting poll with you:"
        >
          <EmailIcon size={iconSize} round className={socialButtonStyle} />
        </EmailShareButton>
      </div>

      <div className="items-center space-x-2 space-y-5">
        <input
          type="text"
          value={pollUrl}
          readOnly
          className="mx-auto block flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-800"
        />
        <button 
          onClick={handleCopyLink}
          className="mx-auto block px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  )
}