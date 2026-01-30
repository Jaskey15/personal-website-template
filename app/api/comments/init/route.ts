import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';

// GET /api/comments/init - Initialize the database
export async function GET() {
  try {
    const result = await initializeDatabase();

    if (result.success) {
      return NextResponse.json({
        message: 'Database initialized successfully'
      });
    } else {
      return NextResponse.json(
        { error: 'Database initialization failed', details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
}
