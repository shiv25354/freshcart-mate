import { useState, useCallback } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from "@/lib/toast";

interface QRCodeDisplayProps {
  orderId: string;
}

export function QRCodeDisplay({ orderId }: QRCodeDisplayProps) {
  const [qrLoading, setQrLoading] = useState(true);
  const [qrError, setQrError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const shareUrl = `${window.location.origin}/track/${orderId}`;
  const maxRetries = 3;

  const handleRetry = useCallback(() => {
    if (retryCount < maxRetries) {
      setQrError(false);
      setQrLoading(true);
      setRetryCount(prev => prev + 1);
    } else {
      toast.error("Failed to generate QR code after multiple attempts");
    }
  }, [retryCount]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Tracking link copied to clipboard');
    } catch (error) {
      console.error('Copy error:', error);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Tracking link copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy link');
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative flex items-center justify-center bg-gray-50 rounded-lg p-4">
        {qrLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 rounded-lg">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}
        {qrError ? (
          <div className="text-center p-4">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
            <p className="text-red-500 mb-2">Failed to generate QR code</p>
            {retryCount < maxRetries ? (
              <button
                onClick={handleRetry}
                className="text-blue-500 hover:text-blue-600"
              >
                Try again
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                Please use the copy link option below
              </p>
            )}
          </div>
        ) : (
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}`}
            alt={`QR code for tracking order #${orderId}`}
            className={`w-48 h-48 transition-opacity duration-200 ${qrLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => {
              setQrLoading(false);
              setQrError(false);
            }}
            onError={() => {
              setQrLoading(false);
              setQrError(true);
            }}
          />
        )}
      </div>
      <div className="space-y-2">
        <button
          onClick={handleCopyLink}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Copy Tracking Link
        </button>
        <p className="text-xs text-center text-gray-500">
          Share this QR code or link to track the order
        </p>
      </div>
    </div>
  );
} 