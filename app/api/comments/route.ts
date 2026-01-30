import { NextRequest, NextResponse } from 'next/server';
import { getCommentsBySlug, createComment } from '@/lib/db';

// GET /api/comments?slug=post-slug
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Post slug is required' },
        { status: 400 }
      );
    }

    const comments = await getCommentsBySlug(slug);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST /api/comments
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postSlug, authorName, content, authorEmail, parentCommentId } = body;

    // Validation
    if (!postSlug || !authorName || !content) {
      return NextResponse.json(
        { error: 'Post slug, author name, and content are required' },
        { status: 400 }
      );
    }

    if (authorName.length > 100) {
      return NextResponse.json(
        { error: 'Author name must be 100 characters or less' },
        { status: 400 }
      );
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { error: 'Comment must be 5000 characters or less' },
        { status: 400 }
      );
    }

    const comment = await createComment(
      postSlug,
      authorName,
      content,
      authorEmail || null,
      parentCommentId || null
    );

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
