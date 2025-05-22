import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
	isAdmin: true,
	isLoading: false,
	error: null,

	checkAdminStatus: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/admin/check");
			set({ isAdmin: response.data.admin, error: null });
		} catch (error) {
			set({ isAdmin: false, error: error.response?.data?.message || "Failed to check admin status" });
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => {
		set({ isAdmin: true, isLoading: false, error: null });
	},
}));