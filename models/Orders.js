import mongoose from 'mongoose';
import Product from './Product';
import Customer from './Customer';
import Affiliate from '@/models/Affiliate';
import ShippingMethod from './ShippingMethod';

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: String,
    image: String,
    isVariable: {
      type: Boolean,
      required: true,
    },
    variationId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    variationLabel: String,
    unit: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },

    orderItems: [orderItemSchema],

    shippingAddress: {
      name: String,
      address: String,
      city: String,
      postalCode: String,
      state: String,
      country: String,
    },

    // ✅ NEW: reference to ShippingMethod collection
    shippingMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShippingMethod',
      required: true,
    },

    shippingSnapshot: {
      name: String,
      shortNote: String,
      price: Number,
      deliveryTime: String,
    },
    
    paymentMethod: {
      type: String,
    },

    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
      amount: String,
    },

    itemsPrice: {
      type: Number,
      required: true,
    },

    shippingPrice: {
      type: Number,
      required: true,
    },

    taxPrice: {
      type: Number,
    },

    discount: {
      type: Number,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: Date,

    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },

    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Affiliate',
      default: null,
    },
  },
  { timestamps: true }
);

const Order =
  mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;