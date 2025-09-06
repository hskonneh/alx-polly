"use client";

/**
 * ShareButton
 * -----------
 * Small helper that tries to use the Web Share API (mobile/modern browsers)
 * and falls back to copying text to the clipboard. Useful on poll pages
 * and the QR/share UI.
 *
 * Props:
 * - `textToCopy` - the text or URL to copy to clipboard
 * - `buttonText` - visible button label
 * - `url` - optional; when provided the Web Share API is attempted first
 */
import { useState } from "react";
import { Button } from "./ui/button";

interface ShareButtonProps {
  textToCopy: string;
  buttonText: string;
  title?: string;
  url?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  className?: string;
}

export default function ShareButton({ 
  textToCopy, 
  buttonText, 
  title = "Check out this poll!", 
  url,
  variant = "default",
  className 
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Try Web Share API first if URL is provided - this provides a native
    // share sheet on mobile devices and is the preferred UX.
    if (url && navigator.share) {
      try {
        await navigator.share({
          title,
          text: textToCopy,
          url
        });
        return;
      } catch (error) {
        console.log('Web Share API error:', error);
        // Fall back to clipboard on error
      }
    }

    // Fallback to clipboard for desktops and older browsers
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Clipboard error:', error);
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant={variant}
      className={className}
    >
      {copied ? "Copied!" : buttonText}
    </Button>
  );
}
