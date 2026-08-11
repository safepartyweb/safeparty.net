import connectMongo from "@/lib/db";
import Order from "@/models/Orders";
import ShippingMethod from "@/models/ShippingMethod";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/AdminAuth";
import User from "@/models/User";
import Product from "@/models/Product";
import mongoose from "mongoose";

// get all orders for admins
export async function GET(request) {
  const user = await requireAdmin();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectMongo();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  try {
    const skip = (page - 1) * limit;

    const [orders, totalCount] = await Promise.all([
      Order.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user")
        .populate("shippingMethod"),
      Order.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      orders,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.log("Error:", error);

    return NextResponse.json(
      { message: "Failed!", error: error.message },
      { status: 500 }
    );
  }
}

function round2(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

async function validateAndPriceOrderItems(orderItems = []) {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    throw new Error("No order items");
  }

  const validatedItems = [];
  let itemsPrice = 0;

  for (const item of orderItems) {
    const quantity = Number(item.quantity);

    if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
      throw new Error(`Invalid product ID: ${item.productId}`);
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Invalid quantity for product ${item.productId}`);
    }

    const product = await Product.findById(item.productId).lean();

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    let unitPrice = 0;
    let variationId = item.variationId || null;
    let variationLabel = "";
    let unit = "";
    let selectedVariation = null;

    if (product.isVariable) {
      if (!variationId || !mongoose.Types.ObjectId.isValid(variationId)) {
        throw new Error(
          `Variation ID is required for variable product ${product._id}`
        );
      }

      const variations = Array.isArray(product.variations)
        ? product.variations
        : [];

      selectedVariation = variations.find(
        (v) => String(v._id || v.id) === String(variationId)
      );

      if (!selectedVariation) {
        throw new Error(`Variation not found for product ${product._id}`);
      }

      unitPrice = Number(selectedVariation.price ?? 0);
      variationLabel = selectedVariation.label || "";
      unit = selectedVariation.unit || "";

      if (
        typeof selectedVariation.stock === "number" &&
        selectedVariation.stock < quantity
      ) {
        throw new Error(
          `Insufficient stock for ${product.title} - ${variationLabel}`
        );
      }
    } else {
      unitPrice = Number(product.price ?? 0);

      if (typeof product.stock === "number" && product.stock < quantity) {
        throw new Error(`Insufficient stock for ${product.title}`);
      }

      variationId = null;
      variationLabel = "";
      unit = "";
    }

    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      throw new Error(`Invalid price for product ${product.title}`);
    }

    const lineTotal = round2(unitPrice * quantity);
    itemsPrice = round2(itemsPrice + lineTotal);

    validatedItems.push({
      productId: product._id,
      name: product.title,
      image: product.image || product.thumbnail || item.image || "",
      isVariable: !!product.isVariable,
      variationId,
      variationLabel,
      unit,
      price: unitPrice,
      quantity,
    });
  }

  return {
    validatedItems,
    itemsPrice,
  };
}

export async function POST(req) {
  await connectMongo();

  try {
    const body = await req.json();

    const {
      orderItems,
      shippingAddress,
      shippingMethod,
      paymentMethod,
      userId,
      referredBy,
      // discount,
    } = body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Valid user ID is required" },
        { status: 400 }
      );
    }

    if (!orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { message: "No order items" },
        { status: 400 }
      );
    }

    if (!shippingMethod || !mongoose.Types.ObjectId.isValid(shippingMethod)) {
      return NextResponse.json(
        { message: "Shipping method is required" },
        { status: 400 }
      );
    }

    const selectedShippingMethod = await ShippingMethod.findOne({
      _id: shippingMethod,
      isActive: true,
    }).lean();

    if (!selectedShippingMethod) {
      return NextResponse.json(
        { message: "Invalid or unavailable shipping method" },
        { status: 400 }
      );
    }

    const pricing = await validateAndPriceOrderItems(orderItems);

    const previousOrderExists = await Order.exists({
      user: new mongoose.Types.ObjectId(userId),
    });

    const isFirstOrder = !previousOrderExists;
    const firstOrderDiscountPercentage = 20;
    
    const discount = isFirstOrder ? round2(
        pricing.itemsPrice * (firstOrderDiscountPercentage / 100)
      )
    : 0;  


    const taxPrice = 0;
    const shippingPrice = round2(Number(selectedShippingMethod.price || 0));
    const totalPrice = round2(
      pricing.itemsPrice - discount + shippingPrice + taxPrice
    );

    const newOrder = new Order({
      user: userId,
      orderItems: pricing.validatedItems,
      shippingAddress,

      shippingMethod: selectedShippingMethod._id,

      shippingSnapshot: {
        name: selectedShippingMethod.name,
        shortNote: selectedShippingMethod.shortNote || "",
        price: shippingPrice,
        deliveryTime: selectedShippingMethod.deliveryTime || "",
      },

      paymentMethod: paymentMethod || "",
      itemsPrice: pricing.itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      referredBy: referredBy || null,
      discount,
    });

    const savedOrder = await newOrder.save();

    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    console.log("Api order error:", error);

    return NextResponse.json(
      { message: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}