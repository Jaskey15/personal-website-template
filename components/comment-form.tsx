'use client';

import { useState } from 'react';

interface CommentFormProps {
  postSlug: string;
  parentCommentId?: number | null;
  onCommentAdded: () => void;
  onCancel?: () => void;
}

export function CommentForm({
  postSlug,
  parentCommentId = null,
  onCommentAdded,
  onCancel
}: CommentFormProps) {
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postSlug,
          authorName,
          authorEmail: null,
          content,
          parentCommentId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to post comment');
      }

      // Reset form
      setAuthorName('');
      setContent('');
      onCommentAdded();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-bold mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
          maxLength={100}
          className="w-full max-w-xs px-4 py-2 border border-border/60 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-bold mb-2">
          Comment <span className="text-red-500">*</span>
        </label>
        <textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          maxLength={5000}
          rows={4}
          className="w-full px-4 py-2 border border-border/60 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-y"
          placeholder={parentCommentId ? "Write a reply..." : "Your thoughts..."}
        />
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !authorName || !content}
          className="px-6 py-2 bg-primary text-primary-foreground border-2 border-primary rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : parentCommentId ? 'Post Reply' : 'Post Comment'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-border/60 rounded-lg font-medium hover:bg-muted/50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
