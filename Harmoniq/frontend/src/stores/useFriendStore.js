import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useFriendStore = create((set, get) => ({
  friends: [],
  friendRequests: [],
  isLoading: false,
  error: null,

  fetchFriends: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users/friends");
      set({ friends: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch friends" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFriendRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/users/friend-requests");
      set({ friendRequests: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch friend requests" });
    } finally {
      set({ isLoading: false });
    }
  },

  sendFriendRequest: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post(`/users/friend-requests/${userId}`);
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to send friend request" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  acceptFriendRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post(`/users/friend-requests/${requestId}/accept`);
      await get().fetchFriends();
      await get().fetchFriendRequests();
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to accept friend request" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  rejectFriendRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post(`/users/friend-requests/${requestId}/reject`);
      await get().fetchFriendRequests();
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to reject friend request" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  removeFriend: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/users/friends/${userId}`);
      await get().fetchFriends();
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to remove friend" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
})); 