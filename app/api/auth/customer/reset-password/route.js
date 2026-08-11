import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import Customer from '@/models/Customer';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { token, password } = await req.json();

  console.log("Reset password route!")

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded", decoded)
    const customer = await Customer.findById(decoded.customerId);
    // console.log("Customer", customer)
    if (!customer) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });


    // customer.password = await bcrypt.hash(password, 10);
    customer.password = password;
    await customer.save();

    return NextResponse.json({ message: 'Password updated' },{ status: 200 });
  } catch (error) {
    console.log("Error on server side:", error);
    return NextResponse.json({ error: 'Token expired or invalid' }, { status: 401 });
  }
}
