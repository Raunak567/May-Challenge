import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
  getFriends,
  getFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from "../controller/friend.controller.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get friends list
router.get("/friends", getFriends);

// Get friend requests
router.get("/friend-requests", getFriendRequests);

// Send friend request
router.post("/friend-requests/:userId", sendFriendRequest);

// Accept friend request
router.post("/friend-requests/:requestId/accept", acceptFriendRequest);

// Reject friend request
router.post("/friend-requests/:requestId/reject", rejectFriendRequest);

// Remove friend
router.delete("/friends/:friendId", removeFriend);

export default router; 