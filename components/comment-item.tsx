'use client';

import { useState } from 'react';
import { Comment } from '@/lib/db';
import { CommentForm } from './comment-form';

interface CommentItemProps {
  comment: Comment;
  postSlug: string;
  onCommentAdded: () => void;
  depth?: number;
}

export function CommentItem({
  comment,
  postSlug,
  onCommentAdded,
  depth = 0
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplyAdded = () => {
    setShowReplyForm(false);
    onCommentAdded();
  };

  const formattedDate = new Date(comment.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={depth > 0 ? 'ml-8 mt-4' : 'mt-6'}>
      <div className="border-l-2 border-border/40 pl-4">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-medium text-foreground">{comment.author_name}</span>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>

        <p className="text-base text-foreground/90 leading-relaxed mb-3 whitespace-pre-wrap">
          {comment.content}
        </p>

        <div className="flex gap-4 text-sm">
          <button
            onClick={handleReply}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors px-3 py-1 rounded"
          >
            Reply
          </button>
        </div>
      </div>

      {showReplyForm && (
        <div className="mt-4 ml-8">
          <CommentForm
            postSlug={postSlug}
            parentCommentId={comment.id}
            onCommentAdded={handleReplyAdded}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}
    </div>
  );
}
