import { Friend, FriendRequest } from "../models/friend.model.js";
import { User } from "../models/user.model.js";

export const getFriends = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    
    // Get all friend relationships where the user is either userId or friendId
    const friends = await Friend.find({
      $or: [{ userId }, { friendId: userId }],
    });

    // Get the friend IDs (excluding the current user)
    const friendIds = friends.map((friend) => 
      friend.userId === userId ? friend.friendId : friend.userId
    );

    // Get the user details for all friends
    const friendUsers = await User.find({ clerkId: { $in: friendIds } });
    
    res.status(200).json(friendUsers);
  } catch (error) {
    next(error);
  }
};

export const getFriendRequests = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    
    // Get all pending friend requests where the user is the receiver
    const requests = await FriendRequest.find({
      receiverId: userId,
      status: "pending",
    });

    // Get the sender details for all requests
    const senderIds = requests.map((request) => request.senderId);
    const senders = await User.find({ clerkId: { $in: senderIds } });
    
    res.status(200).json(senders);
  } catch (error) {
    next(error);
  }
};

export const sendFriendRequest = async (req, res, next) => {
  try {
    const senderId = req.auth.userId;
    const { userId } = req.params;

    // Check if users exist
    const [sender, receiver] = await Promise.all([
      User.findOne({ clerkId: senderId }),
      User.findOne({ clerkId: userId }),
    ]);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if they're already friends
    const existingFriendship = await Friend.findOne({
      $or: [
        { userId: senderId, friendId: userId },
        { userId: userId, friendId: senderId },
      ],
    });

    if (existingFriendship) {
      return res.status(400).json({ message: "Already friends" });
    }

    // Check if there's already a pending request
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { senderId, receiverId: userId },
        { senderId: userId, receiverId: senderId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already exists" });
    }

    // Create new friend request
    await FriendRequest.create({
      senderId,
      receiverId: userId,
    });

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    next(error);
  }
};

export const acceptFriendRequest = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const { requestId } = req.params;

    const request = await FriendRequest.findOne({
      _id: requestId,
      receiverId: userId,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Update request status
    request.status = "accepted";
    await request.save();

    // Create friend relationship (both ways)
    await Promise.all([
      Friend.create({ userId: request.senderId, friendId: userId }),
      Friend.create({ userId: userId, friendId: request.senderId }),
    ]);

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    next(error);
  }
};

export const rejectFriendRequest = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const { requestId } = req.params;

    const request = await FriendRequest.findOne({
      _id: requestId,
      receiverId: userId,
      status: "pending",
    });

    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    next(error);
  }
};

export const removeFriend = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const { friendId } = req.params;

    // Remove both friend relationships
    await Friend.deleteMany({
      $or: [
        { userId, friendId },
        { userId: friendId, friendId: userId },
      ],
    });

    res.status(200).json({ message: "Friend removed" });
  } catch (error) {
    next(error);
  }
}; 