import { NextResponse } from 'next/server';
import connectMongo from "@/lib/db";
import { getAuthUser } from "@/lib/auth";
import Customer from '@/models/Customer';
import jwt from 'jsonwebtoken';



export async function GET(request) {


  try {
    await connectMongo();
    const user = await getAuthUser();
    // console.log("user", user)

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    // console.log("Params", page,limit)

    const skip = (page - 1) * limit;

    const [orders, totalCount] = await Promise.all([
      Order.find({user: user.id})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.find({user: user.id}).countDocuments()
    ]);

    
    return NextResponse.json({
      success: true,
      orders,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });
    

  } catch (error) {
    console.error('[ORDERS_GET_ERROR]', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }




}


//edit customer info:
export async function POST(request) {


  try {
    await connectMongo();
    const user = await getAuthUser();
    // console.log("user", user)

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const customer = await Customer.findById(user.id)

    const data = await request.json();
    
    
    if(data.password){
      const isMatch = await customer.comparePassword(data.password);
      if (!isMatch) {
        return Response.json({ message: "Wrong old password!"  }, { status: 401 })
      }

      customer.password = data.newPassword;

      await customer.save();

      return Response.json({ message: "Password changed!"  }, { status: 200 })
      // return Response.json({message: "Password changed!" }, { status: 200 })

    }
    //End pass changed tasks.


    //edit other info
    console.log("edit data",data)
    customer.fullName = data.fullName;
    customer.email = data.email;
    customer.phone = data.phone;
    customer.address = data.address;
    customer.city = data.city;
    customer.state = data.state;
    customer.postalCode = data.postalCode;
    customer.country = data.country;

    try {
      const updatedCustomer = await customer.save();
      return NextResponse.json({
        success: true,
        customer:updatedCustomer
      });    
    } catch (error) {
      console.log("Error", error)
      return NextResponse.json({
        success: false,
        error
      });
    }

  

  } catch (error) {
    console.log("Error", error)
    return NextResponse.json({ success: false, message:'Something went wrong', error },{ status: 500 });
  }




}
