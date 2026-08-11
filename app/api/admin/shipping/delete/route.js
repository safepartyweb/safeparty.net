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

    const formData = await req.formData();
    const id = formData.get("id");

    await ShippingMethod.findByIdAndDelete(id);

    return NextResponse.redirect(
      new URL("/admin/shipping", req.url)
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}