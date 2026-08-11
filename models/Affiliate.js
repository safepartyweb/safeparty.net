// models/Affiliate.js
import mongoose from 'mongoose';
import Customer from '@/models/Customer';
import bcrypt from 'bcryptjs'



const affiliateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  affiliateCode: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  totalClicks: { type: Number, default: 0 },
  totalSignups: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  totalEarned: { type: Number, default: 0 },
  pendingWithdraw: { type: Number, default: 0 },
  currentBalance: {
    type: Number,
    default: 0,
  },
  withdrawnAmount: {
    type: Number,
    default: 0,
  },
  referredCustomers: [
    {
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
      date: { type: Date, default: Date.now },
    },
  ],

  commissionHistory: [
    {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
      amount: Number,
      date: { type: Date, default: Date.now },
      paid: { type: Boolean, default: false },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// Hash password before saving
affiliateSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
affiliateSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};





export default mongoose.models.Affiliate || mongoose.model('Affiliate', affiliateSchema);
