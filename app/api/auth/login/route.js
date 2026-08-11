import connectMongo from "@/lib/db";
import User from "@/models/User";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const jwtSecret = process.env.JWT_SECRET;


export async function POST(req) {
  // const reqBody = await req.json();
  // console.log("Request Data", reqBody);
  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  // console.log("data",data)
  const email = data.email
  const password = data.password

  try {

    const user = await User.findOne({email})
    // console.log("user: ", user)


    if(!user){
      return Response.json(
        { message: "Invalid email or password!" }, 
        { status: 401 }
      );
    }

    if(user.status === 'inactive'){
      return Response.json(
        { message: "Not authorized yet!" }, 
        { status: 401 }
      );
    }
    
    const isMatch = await user.comparePassword(password);
    //console.log("isMatch", isMatch)
    if (!isMatch) {
      return Response.json({ message: "Invalid email or password!"  }, { status: 401 })
    }

    

    const token = jwt.sign(
      { userId: user._id.toString(), role:user.role }, jwtSecret, { expiresIn: '1d' }
    );
    
    const cookieStore = await cookies();
    
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60, // 1 day in seconds
      sameSite: 'strict',
      path: '/',
    });

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return Response.json({ message: "success!", user:userData }, { status: 200 })

  } catch (error) {
    console.log("Login Error:", error)
    return Response.json({ message: "Something went wrong!", error }, { status: 500 })
  }

}