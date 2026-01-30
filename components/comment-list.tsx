'use client';

import { Comment } from '@/lib/db';
import { CommentItem } from './comment-item';

interface CommentListProps {
  comments: Comment[];
  postSlug: string;
  onCommentAdded: () => void;
}

export function CommentList({ comments, postSlug, onCommentAdded }: CommentListProps) {
  // Organize comments into a tree structure
  const commentMap = new Map<number, Comment>();
  const rootComments: Comment[] = [];

  comments.forEach((comment) => {
    commentMap.set(comment.id, comment);
    if (!comment.parent_comment_id) {
      rootComments.push(comment);
    }
  });

  const getReplies = (parentId: number): Comment[] => {
    return comments.filter((c) => c.parent_comment_id === parentId);
  };

  const renderComment = (comment: Comment, depth: number = 0) => {
    const replies = getReplies(comment.id);

    return (
      <div key={comment.id}>
        <CommentItem
          comment={comment}
          postSlug={postSlug}
          onCommentAdded={onCommentAdded}
          depth={depth}
        />
        {replies.length > 0 && (
          <div>
            {replies.map((reply) => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rootComments.map((comment) => renderComment(comment))}
    </div>
  );
}
