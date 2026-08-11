import connectMongo from "@/lib/db";
import ShippingMethod from "@/models/ShippingMethod";
import { requireSuperAdmin } from "@/lib/AdminAuth";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const {id} = await params;
  try {
    const admin = await requireSuperAdmin();

    if (!admin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectMongo();

    const body = await req.json();

    console.log("body data:", body)

    const updated = await ShippingMethod.findByIdAndUpdate(
      id,
      {
        name: body.name,
        shortNote: body.shortNote,
        price: body.price,
        deliveryTime: body.deliveryTime,
        isActive: body.isActive,
      },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}