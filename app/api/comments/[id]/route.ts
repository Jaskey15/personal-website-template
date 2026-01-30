import { NextRequest, NextResponse } from 'next/server';
import { deleteComment } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// DELETE /api/comments/[id]
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const commentId = parseInt(id, 10);

    if (isNaN(commentId)) {
      return NextResponse.json(
        { error: 'Invalid comment ID' },
        { status: 400 }
      );
    }

    const success = await deleteComment(commentId);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete comment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}
