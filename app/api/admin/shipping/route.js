import connectMongo from "@/lib/db";
import ShippingMethod from "@/models/ShippingMethod";
import { requireSuperAdmin } from "@/lib/AdminAuth";
import { NextResponse } from "next/server";

export async function POST(req) {
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

    const method = await ShippingMethod.create({
      name: body.name,
      shortNote: body.shortNote,
      price: Number(body.price),
      deliveryTime: body.deliveryTime,
      isActive: true,
    });

    return NextResponse.json(method, { status: 201 });
  } catch (error) {
    console.log("Error on route file:", error)
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongo();

    const shippingMethods = await ShippingMethod.find({})
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        methods: shippingMethods.map((method) => ({
          _id: method._id.toString(),
          name: method.name,
          shortNote: method.shortNote || "",
          price: Number(method.price || 0),
          deliveryTime: method.deliveryTime || "",
          isActive: method.isActive,
          sortOrder: method.sortOrder || 0,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching shipping methods:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}