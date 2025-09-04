"use client";

import { useState } from "react";

interface ShareButtonProps {
  textToCopy: string;
  buttonText: string;
  className?: string;
}

export default function ShareButton({ textToCopy, buttonText, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
    >
      {copied ? "Copied!" : buttonText}
    </button>
  );
}
