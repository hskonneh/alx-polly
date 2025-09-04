// File: /lib/utils/qr-code.ts
import QRCode from 'qrcode'

// Custom error for QR code generation issues
export class QRCodeGenerationError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message)
    this.name = 'QRCodeGenerationError'
    if (originalError) {
      this.stack = originalError.stack
    }
  }
}

export async function generateQRCode(url: string, options?: QRCode.QRCodeToDataURLOptions): Promise<string> {
  if (!url || typeof url !== 'string') {
    throw new QRCodeGenerationError('Invalid URL provided for QR code generation')
  }

  try {
    // Validate URL format
    new URL(url)

    const defaultOptions: QRCode.QRCodeToDataURLOptions = {
      errorCorrectionLevel: 'H',  // Highest error correction level
      type: 'image/png',
      margin: 4,            // Margin around the QR code
      width: 300,          // Size in pixels
      color: {
        dark: '#000000',   // QR code color
        light: '#ffffff'   // Background color
      }
    }

    const mergedOptions = { ...defaultOptions, ...options }
    
    const qrCodeDataUrl = await QRCode.toDataURL(url, mergedOptions)
    
    if (!qrCodeDataUrl.startsWith('data:image/png;base64,')) {
      throw new QRCodeGenerationError('Invalid QR code data URL format')
    }

    return qrCodeDataUrl
  } catch (error) {
    console.error('QR Code Generation Error:', error)
    
    if (error instanceof QRCodeGenerationError) {
      throw error
    }

    if (error instanceof Error) {
      throw new QRCodeGenerationError(
        'Failed to generate QR code',
        error
      )
    }

    throw new QRCodeGenerationError('Unknown error during QR code generation')
  }
}