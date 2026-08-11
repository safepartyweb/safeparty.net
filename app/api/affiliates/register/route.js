import { NextResponse } from 'next/server'
import connectMongo from "@/lib/db";
import Affiliate from '@/models/Affiliate'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'



export async function POST(req) {
  // console.log("Register Affiliate route hit!")
  try {
    await connectMongo()
    const body = await req.json()
    const { name, email, password } = body

    // console.log("Req data",name, email, password )

    // Check if exists
    const existing = await Affiliate.findOne({ email })
    if (existing) {
      return NextResponse.json({ message: 'Affiliate already exists' }, { status: 400 })
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10)

    // Generate unique affiliateCode
    const affiliateCode = `${name.toLowerCase().replace(/\s/g, '')}_${nanoid()}`

    const newAffiliate = await Affiliate.create({
      name,
      email,
      password,
      affiliateCode,
    })

    return NextResponse.json({
      message: 'Affiliate registered successfully',
      affiliateCode: newAffiliate.affiliateCode,
      affiliate:newAffiliate,
    },{ status: 201 })
  } catch (error) {
    console.error('Affiliate Register Error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
