// Store API configuration and setup
import { configureStore } from "@reduxjs/toolkit";

export const createStore = () => {
  return {
    // API client configuration can be added here
    baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.ridex.ir",
    timeout: 30000,
  };
};
