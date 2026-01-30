'use client';

import { useState, useEffect } from 'react';
import { Comment } from '@/lib/db';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';

interface CommentsSectionProps {
  postSlug: string;
  postTitle: string;
}

export function CommentsSection({ postSlug, postTitle }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data = await response.json();
      setComments(data.comments);
    } catch (err) {
      setError('Failed to load comments');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const handleCommentAdded = () => {
    fetchComments();
  };

  return (
    <div className="mt-16 pt-12 border-t border-border/20">
      <h2 className="text-3xl font-serif font-bold mb-8 tracking-tight">
        Let me hear your thoughts:
      </h2>

      <div className="mb-8">
        <CommentForm postSlug={postSlug} onCommentAdded={handleCommentAdded} />
      </div>

      <h3 className="text-2xl font-serif font-bold mb-8 tracking-tight">
        Comments {comments.length > 0 && <span className="text-muted-foreground"> ({comments.length})</span>}
      </h3>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading comments...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <CommentList
          comments={comments}
          postSlug={postSlug}
          onCommentAdded={handleCommentAdded}
        />
      )}
    </div>
  );
}
