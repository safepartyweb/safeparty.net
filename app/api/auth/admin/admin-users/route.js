import connectMongo from "@/lib/db";
import User from "@/models/User";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { getAuthUser } from "@/lib/auth";



export async function POST(req) {

  await connectMongo();
  const user = await getAuthUser();
  // console.log("user", user)

  if(!user || user.role === 'customer'){
    return Response.json({ message: "Unauthorized!" }, { status: 401 })
  }

  
  try {
    const admins = await User.find();
    return Response.json({ message: "Success!", admins }, { status: 200 })
  } catch (error) {
    console.log("Error:", error)
    return Response.json({ message: "Error!" }, { status: 500 })
  }
 

}