const mongoose = require("mongoose");
import bcrypt from 'bcryptjs';
import Affiliate from '@/models/Affiliate'


const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String },
  role: { type: String, default:"customer" },
  password: { type: String, required: true },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Affiliate',
    default: null,
  }
}, { timestamps: true });


customerSchema.pre('save', async function (next) {
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
customerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};



export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);
