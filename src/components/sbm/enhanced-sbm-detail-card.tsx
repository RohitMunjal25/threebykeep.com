'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUp, ExternalLink, Bookmark, MessageSquare, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RichContent } from '@/components/shared/rich-content'
import { SharePopup } from '@/components/ui/share-popup'

interface EnhancedSBMDetailCardProps {
  title: string
  description: string
  category: string
  domain: string
  author?: {
    name: string
    avatar?: string
  }
  upvotes: number
  saves: number
  commentsCount: number
  url: string
  tags: string[]
  isUpvoted?: boolean
  isSaved?: boolean
  slug: string
}

export function EnhancedSBMDetailCard({
  title,
  description,
  category,
  domain,
  author,
  upvotes,
  saves,
  commentsCount,
  url,
  tags,
  isUpvoted = false,
  isSaved = false,
  slug,
}: EnhancedSBMDetailCardProps) {
  const [saved, setSaved] = useState(isSaved)
  const [savesCount, setSavesCount] = useState(saves)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState('')
  const { toast } = useToast()
  const router = useRouter()

  const handleSave = () => {
    // Navigate to login page instead of saving
    router.push('/login')
  }

  const handleShare = async () => {
    // Check if we're on the client side and window is available
    if (typeof window === 'undefined') {
      toast({
        title: 'Cannot copy URL',
        description: 'Please copy the URL from your browser address bar.',
      })
      return
    }

    // Check if clipboard API is available
    if (!navigator.clipboard) {
      toast({
        title: 'Clipboard not available',
        description: 'Your browser does not support clipboard operations. Please copy the URL manually.',
      })
      return
    }

    try {
      const currentUrl = window.location.href
      await navigator.clipboard.writeText(currentUrl)
      
      // Verify the copy was successful by trying to read it back
      const copiedText = await navigator.clipboard.readText()
      if (copiedText === currentUrl) {
        // Show popup instead of toast
        setCopiedUrl(currentUrl)
        setShowSharePopup(true)
      } else {
        throw new Error('Copy verification failed')
      }
    } catch (error) {
      console.error('Failed to copy URL:', error)
      toast({
        title: 'Failed to copy',
        description: 'Could not copy the URL to clipboard. Please copy it manually.',
      })
    }
  }

  const handleComments = () => {
    // Navigate to login page instead of comments
    router.push('/login')
  }

  return (
    <div>
      <Card className="overflow-hidden border-0 shadow-none">
        <CardContent className="p-0">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Title Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground leading-tight">
                    {title}
                  </h1>
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    {author && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={author.avatar} alt={author.name} />
                          <AvatarFallback className="text-xs">
                            {author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{author.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-xs font-medium">
                  {category}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div 
              className="text-base leading-7 text-muted-foreground [&>*]:inline [&>*]:m-0 [&>*]:p-0 [&_a]:text-red-500 [&_a]:underline [&_a]:underline-offset-2"
              dangerouslySetInnerHTML={{
                __html: (() => {
                  let html = description
                    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
                    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
                    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
                    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
                    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
                    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"')
                    .replace(/style\s*=\s*"[^"]*display\s*:\s*block[^"]*"/gi, '')
                    .replace(/<br\s*\/?>/gi, ' ')
                    .replace(/<\/p>\s*<p[^>]*>/gi, ' ')
                    .replace(/<p[^>]*>/gi, '<span>')
                    .replace(/<\/p>/gi, '</span>')
                    .replace(/<div[^>]*>/gi, '<span>')
                    .replace(/<\/div>/gi, '</span>')
                    .replace(/\n+/g, ' ')
                    .trim();
                  return html || "No description available.";
                })()
              }}
            />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t">
              <Button
                variant={saved ? 'default' : 'outline'}
                size="sm"
                onClick={handleSave}
                className="gap-2"
              >
                <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} />
                {savesCount}
              </Button>
              <Button variant="outline" size="sm" onClick={handleComments} className="gap-2">
                <MessageSquare className="h-4 w-4" />
                {commentsCount}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Popup */}
      <SharePopup
        show={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        message="URL copied!"
        url={copiedUrl}
      />
    </div>
  )
}
