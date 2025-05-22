import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true }, // Clerk user ID
    receiverId: { type: String, required: true }, // Clerk user ID
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const friendSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk user ID
    friendId: { type: String, required: true }, // Clerk user ID
  },
  { timestamps: true }
);

// Create compound indexes to ensure uniqueness
friendRequestSchema.index({ senderId: 1, receiverId: 1 }, { unique: true });
friendSchema.index({ userId: 1, friendId: 1 }, { unique: true });

export const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
export const Friend = mongoose.model("Friend", friendSchema); 