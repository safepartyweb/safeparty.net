import connectMongo from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {

  return Response.json({ message: "Register Route!", }, { status: 200 })
  
}


export async function POST(req) {
  // const reqBody = await req.json();
  // console.log("Request Data", reqBody);
  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  console.log("data",data)

  const userData = {
    ...data,
    status: 'inactive',
  };

  try {
    const newUser = await User.create(userData)
    return Response.json({ message: "success!", user:newUser }, { status: 200 })
  } catch (error) {
    return Response.json({ message: "Something went wrong!", error }, { status: 500 })
  }

}
