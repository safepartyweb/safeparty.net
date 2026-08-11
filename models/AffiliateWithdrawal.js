import mongoose from 'mongoose';

const affiliateWithdrawalSchema = new mongoose.Schema(
  {
    affiliate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Affiliate',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    processedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.AffiliateWithdrawal || mongoose.model('AffiliateWithdrawal', affiliateWithdrawalSchema);
