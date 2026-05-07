'use client'

import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SharePopupProps {
  show: boolean
  onClose: () => void
  message?: string
  url?: string
}

export function SharePopup({ show, onClose, message = 'URL copied!', url }: SharePopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      // Auto-close after 3 seconds
      const timer = setTimeout(() => {
        handleClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show])

  const handleClose = () => {
    setIsVisible(false)
    // Allow animation to complete before fully closing
    setTimeout(() => {
      onClose()
    }, 200)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-200",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div
        className={cn(
          "relative z-10 mx-4 max-w-sm rounded-2xl border border-border bg-white p-6 shadow-2xl transition-all duration-200 dark:bg-gray-900",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Success icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto mb-4">
          <Check className="h-6 w-6 text-green-600" />
        </div>

        {/* Message */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {message}
          </h3>
          
          {url && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
                {url}
              </p>
            </div>
          )}

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            The URL has been copied to your clipboard
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={handleClose}
          className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
