import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectMongo from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET() {
  try {
    await connectMongo();
    
    // 1. Get token from HTTP-only cookie (must be awaited)
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { user: null, message: 'Not authenticated' }, 
        { status: 401 }
      );
    }

    // 2. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Find user in database
    const user = await Customer.findById(decoded.userId).select('-password');
    
    if (!user) {
      // User not found but token was valid - clear invalid token
      await cookieStore.delete('token');
      return NextResponse.json(
        { user: null, message: 'User not found' },
        { status: 404 }
      );
    }

    // 4. Return user data
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    // Handle JWT errors (expired, invalid, etc.)
    if (error instanceof jwt.JsonWebTokenError) {
      const cookieStore = await cookies();
      await cookieStore.delete('token');
      return NextResponse.json(
        { user: null, message: 'Invalid token' },
        { status: 401 }
      );
    }

    console.error('ME route error:', error);
    return NextResponse.json(
      { user: null, message: 'Server error' },
      { status: 500 }
    );
  }
}