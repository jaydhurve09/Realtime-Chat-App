import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  onlineUsers: [],
  
  checkAuth: async () => {
    try {
      const { data } = await axiosInstance.get('/auth/check');
      console.log('Auth check response:', data);
      set({ authUser: data.user, isCheckingAuth: false });
    } catch (error) {
      if (error?.response?.status === 401) {
        // Expected when not logged in
        set({ authUser: null, isCheckingAuth: false });
        return; // Silent fail for auth check
      }
      // Log other unexpected errors
      console.error('Auth check failed:', error.message);
      set({ authUser: null, isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },
}));