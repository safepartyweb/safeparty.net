import mongoose from 'mongoose';

const shippingMethodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    // code: {
    //   type: String,
    //   required: true,
    //   unique: true, // e.g. "standard", "express"
    // },

    shortNote: {
      type: String,
      default: '',
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    deliveryTime: {
      type: String,
      required: true, // e.g. "3-5 business days"
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ShippingMethod =
  mongoose.models.ShippingMethod ||
  mongoose.model('ShippingMethod', shippingMethodSchema);

export default ShippingMethod;