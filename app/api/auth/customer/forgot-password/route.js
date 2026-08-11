import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Customer from '@/models/Customer';
import { sendResetEmail } from '@/lib/email/sendResetEmail';
import connectMongo from "@/lib/db";




export async function POST(req) {
  await connectMongo();
  const { email } = await req.json();

  console.log("Customer Email", email)
  const siteUrl = process.env.NODE_ENV == 'development' ?  process.env.NEXT_DEV_BASE_URL :  process.env.NEXT_PUBLIC_BASE_URL

  // 1. Find user by email
  const customer = await Customer.findOne({ email });
  if (!customer) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });

  // 2. Create JWT token with expiration (15 mins)
  const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

  // 3. Send email (replace with your mail function)
  const resetLink = `${siteUrl}/reset-password?token=${token}`;

  await sendResetEmail(email, resetLink);

  return NextResponse.json({ message: 'Reset link sent' },{ status: 200 });
}
