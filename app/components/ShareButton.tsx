"use client";

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
    // Try Web Share API first if URL is provided
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
        // Fall back to clipboard
      }
    }

    // Fallback to clipboard
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
