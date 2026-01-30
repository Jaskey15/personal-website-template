import { neon } from '@neondatabase/serverless';

export interface Comment {
  id: number;
  post_slug: string;
  author_name: string;
  author_email: string | null;
  content: string;
  parent_comment_id: number | null;
  created_at: Date;
}

const sql = neon(process.env.DATABASE_URL!);

export async function initializeDatabase() {
  try {
    // Create table
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_slug VARCHAR(255) NOT NULL,
        author_name VARCHAR(100) NOT NULL,
        author_email VARCHAR(255),
        content TEXT NOT NULL,
        parent_comment_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create indexes (PostgreSQL requires separate statements)
    await sql`
      CREATE INDEX IF NOT EXISTS idx_post_slug ON comments(post_slug);
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_parent_comment ON comments(parent_comment_id);
    `;

    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
}

export async function getCommentsBySlug(slug: string): Promise<Comment[]> {
  const rows = await sql`
    SELECT * FROM comments
    WHERE post_slug = ${slug}
    ORDER BY created_at ASC
  `;
  return rows as Comment[];
}

export async function createComment(
  postSlug: string,
  authorName: string,
  content: string,
  authorEmail: string | null = null,
  parentCommentId: number | null = null
): Promise<Comment> {
  const rows = await sql`
    INSERT INTO comments (post_slug, author_name, author_email, content, parent_comment_id)
    VALUES (${postSlug}, ${authorName}, ${authorEmail}, ${content}, ${parentCommentId})
    RETURNING *
  `;
  return rows[0] as Comment;
}

export async function deleteComment(id: number): Promise<boolean> {
  try {
    await sql`DELETE FROM comments WHERE id = ${id}`;
    return true;
  } catch (error) {
    console.error('Delete comment error:', error);
    return false;
  }
}
