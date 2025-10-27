'use client'

import { Heart, Send, User } from "lucide-react"
import { useState } from "react"
import { SpotComment } from "@/types/spot-details"

interface SpotCommentsProps {
  comments: SpotComment[]
  spotId: number
}

export function SpotComments({ comments: initialComments, spotId }: SpotCommentsProps) {
  const [comments, setComments] = useState<SpotComment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [likingCommentId, setLikingCommentId] = useState<number | null>(null)

  // Sort comments: first by likes (descending), then by createdAt (latest first)
  const sortedComments = [...comments].sort((a, b) => {
    // First sort by likes (most likes first)
    if (b.likes !== a.likes) {
      return b.likes - a.likes
    }
    // If likes are equal, sort by date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)


    try {
      const response = await fetch(`/api/spots/${spotId}/comments`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: newComment })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to post comment')
      }

      const result = await response.json()

      // Add the new comment to the top of the list
      setComments([result.comment, ...comments])
      // Clear the input
      setNewComment('')

    } catch (error) {
      console.error('Failed to post comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = async (commentId: number) => {
    // Prevent spam - check if already liking
    if (likingCommentId !== null) {
      return
    }

    setLikingCommentId(commentId)

    try {
      const response = await fetch(`/api/spots/${spotId}/comments/${commentId}/like`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error('Failed to like comment')
      }

      const result = await response.json()

      // Update the comment's likes count in the local state
      setComments(comments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: result.likes }
          : comment
      ))
    } catch (err) {
      console.error('Failed to like comment:', err)
    } finally {
      // Add 1 second cooldown before allowing another like
      setTimeout(() => {
        setLikingCommentId(null)
      }, 1000)
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000)
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d ago`
    const weeks = Math.floor(days / 7)
    if (weeks < 4) return `${weeks}w ago`
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Comments List */}
      <div className="flex-1 overflow-y-auto">
        {comments.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">

            {sortedComments.map((comment) => (
              <div key={comment.id} className="px-4 py-4 hover:bg-gray-50 transition">
                <div className="flex gap-3">
                  {/* User Avatar */}

                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                      <User size={18} className="text-gray-600" />
                    </div>
                  </div>

                  {/* Comment Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {comment.user?.username || 'Anonymous'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      {comment.comment}
                    </p>

                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(comment.id)}
                      disabled={likingCommentId !== null}
                      className={`flex items-center gap-1.5 text-sm transition ${likingCommentId !== null
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:text-red-500'
                        }`}
                    >
                      <Heart size={20} />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comment Input */}
      <div className="border-t border-gray-200 bg-white sticky bottom-0">
        <form onSubmit={handleSubmit} className="px-4 py-3">
          <div className="flex gap-2 items-end">
            {/* User Avatar */}
            <div className="flex-shrink-0 mb-1">
              <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
            </div>

            {/* Input Field */}
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={1}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition mb-1"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}