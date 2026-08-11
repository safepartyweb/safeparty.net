import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    googleId: {
      type: String,
      index: true,
      sparse: true,
    },

    provider: {
      type: String,
      enum: ["google"],
      default: "google",
    },

    role: {
      type: String,
      enum: ["pending", "admin", "super_admin"],
      default: "pending",
    },

    status: {
      type: String,
      enum: ["inactive", "active", "blocked"],
      default: "inactive",
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);