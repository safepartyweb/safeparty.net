import connectMongo from "@/lib/db";
import Order from "@/models/Orders";
import { getAuthUser } from "@/lib/auth";
import Affiliate from "@/models/Affiliate";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/AdminAuth";



//get single order
export async function GET(req, { params }) {

  // console.log("Individual Order route hit!")
  
  try {
    const { orderId } = await params;
    console.log("Order Id", orderId)
    
    const user = await requireAdmin();

    // console.log("Auth user res on api:", user)
    
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    if (!orderId) {
      return Response.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId).populate('user');

    if (!order) {
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, order },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching order:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}


//edit single order
/*
export async function PATCH(req, { params }) {

  await connectMongo();

  const data = await req.json();
  console.log("Edit order data:",data)


  try {
    const { orderId } = await params;
    // console.log("Order Id", orderId)
    
    const user = await getAuthUser();
    if (!user && user.role !=='admin' ) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    if (!orderId) {
      return Response.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    const paymentStatus = data.isPaid == 'true' ? true : false
    order.isPaid = paymentStatus
    order.status = data.status;

    if( data.isPaid == 'true' && order.referredBy ){
      const commission = order.total * 0.1; // 10% commission example

        await Affiliate.findByIdAndUpdate(order.referrer, {
          $inc: {
            totalOrders: 1,
            totalEarned: commission,
            currentBalance: commission,
          },
        });
    }

    const updatedOrder = await order.save();

    
    // product.name = data.name || product.name;
    // product.price = data.price || product.price;
    // product.description = data.description || product.description;

    // const updatedProduct = await product.save();
    
    return Response.json({ message: "success!", order: updatedOrder}, { status: 200 })
  } catch (error) {
    return Response.json({ message: error.message, error }, { status: 500 })
  }
}

*/

/*
export async function PATCH(req, { params }) {
  await connectMongo();

  try {
    const { orderId } = await params;
    const data = await req.json();

    const user = await requireAdmin();
    console.log("Auth user res on order edit api:", user)

    if (!user || !["admin", "super_admin"].includes(user.role)) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'Order ID is required' },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    const wasPaid = order.isPaid; // track previous payment status
    const paymentStatus = data.isPaid === 'true';

    order.isPaid = paymentStatus;
    order.status = data.status;

    // Only update affiliate commission **if payment is newly marked as paid**
    if (paymentStatus && !wasPaid && order.referredBy) {
      const commission = order.itemsPrice * 0.1; // 10% commission

      await Affiliate.findByIdAndUpdate(order.referredBy, {
        $inc: {
          totalOrders: 1,
          totalEarned: commission,
          currentBalance: commission,
        },
      });
    }

    // Only update affiliate commission **if payment is newly marked as paid**
    if (!paymentStatus && wasPaid && order.referredBy) {
      const commission = order.itemsPrice * 0.1; // 10% commission

      await Affiliate.findByIdAndUpdate(order.referredBy, {
        $inc: {
          totalOrders: -1,
          totalEarned: -commission,
          currentBalance: -commission,
        },
      });
    }




    const updatedOrder = await order.save();

    return NextResponse.json({ message: 'Order updated', order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
*/



export async function PATCH(req, { params }) {
  await connectMongo();

  try {
    const { orderId } = await params;
    const data = await req.json();

    const user = await requireAdmin();

    console.log("Auth user res on order edit api:", user);

    if (!user || !["admin", "super_admin"].includes(user.role)) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (data.status && !allowedStatuses.includes(data.status)) {
      return NextResponse.json(
        { message: "Invalid order status" },
        { status: 400 }
      );
    }

    const wasPaid = order.isPaid;

    const paymentStatus =
      data.isPaid === true || data.isPaid === "true";

    order.isPaid = paymentStatus;
    order.status = data.status || order.status;

    if (paymentStatus && !wasPaid) {
      order.paidAt = new Date();
    }

    if (!paymentStatus && wasPaid) {
      order.paidAt = null;
    }

    // Add affiliate commission only when payment is newly marked as paid
    if (paymentStatus && !wasPaid && order.referredBy) {
      const commission = order.itemsPrice * 0.1;

      await Affiliate.findByIdAndUpdate(order.referredBy, {
        $inc: {
          totalOrders: 1,
          totalEarned: commission,
          currentBalance: commission,
        },
      });
    }

    // Remove affiliate commission only when payment is changed from paid to unpaid
    if (!paymentStatus && wasPaid && order.referredBy) {
      const commission = order.itemsPrice * 0.1;

      await Affiliate.findByIdAndUpdate(order.referredBy, {
        $inc: {
          totalOrders: -1,
          totalEarned: -commission,
          currentBalance: -commission,
        },
      });
    }

    const updatedOrder = await order.save();

    return NextResponse.json(
      {
        message: "Order updated",
        order: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Order edit error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}



export async function DELETE(req, { params }) {
  console.log("Order delete hit!")
  await connectMongo();
  const { orderId } = await params;


  try {
    
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    
    if(!deletedOrder){
      throw new Error("Order not found!")
    }

    return Response.json({ message: "deleted successfully!", order:deletedOrder }, { status: 200 })
  } catch (error) {
    return Response.json({ message: error.message, error }, { status: 500 })
  }
  
}







/*







export async function POST(req) {

  // const reqBody = await req.json();
  // console.log("Request Data", reqBody);
  await connectMongo();
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  const images = JSON.parse(data.images);

  const title = data.title;
  const price = data.price;
  const stock = data.stock;
  const description = data.description;
  const bestSeller = data.bestSeller;
  // console.log("data",title, price, stock, description,images  )
  console.log("bestSeller",bestSeller  )


  try {
    const newProduct = await Product.create({title,price,stock,description,images,bestSeller })
    return Response.json({ message: "success!", product:newProduct }, { status: 200 })
  } catch (error) {
    return Response.json({ message: "Something went wrong!", error }, { status: 500 })
  }

//return Response.json({ message: "test!", }, { status: 200 })
  
}


*/
