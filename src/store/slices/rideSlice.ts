// src/store/slices/rideSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Ride, RideType, Location, RideStatus } from "@/types";

interface BookingState {
  origin: Location | null;
  destination: Location | null;
  selectedType: RideType;
  estimatedPrice: number | null;
  estimatedDuration: number | null;
}

interface RideState {
  currentRide: Ride | null;
  booking: BookingState;
  history: Ride[];
  isSearching: boolean;
  status: "idle" | "searching" | "active" | "completed"; // ✅ اضافه کردن status
}

const initialState: RideState = {
  currentRide: null,
  booking: {
    origin: null,
    destination: null,
    selectedType: "go",
    estimatedPrice: null,
    estimatedDuration: null,
  },
  history: [],
  isSearching: false,
  status: "idle", // ✅ مقدار اولیه
};

const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
    // ── Booking ──────────────────────────────────────────────
    setOrigin(state, action: PayloadAction<Location | null>) {
      state.booking.origin = action.payload;
    },
    setDestination(state, action: PayloadAction<Location | null>) {
      state.booking.destination = action.payload;
    },
    setRideType(state, action: PayloadAction<RideType>) {
      state.booking.selectedType = action.payload;
    },
    setEstimate(
      state,
      action: PayloadAction<{ price: number; duration: number }>
    ) {
      state.booking.estimatedPrice = action.payload.price;
      state.booking.estimatedDuration = action.payload.duration;
    },
    resetBooking(state) {
      state.booking = initialState.booking;
    },

    // ── Searching ────────────────────────────────────────────
    setSearching(state, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
      state.status = action.payload ? "searching" : "idle"; // ✅ به‌روزرسانی status
    },

    // ── Current Ride ─────────────────────────────────────────
    setCurrentRide(state, action: PayloadAction<Ride | null>) {
      state.currentRide = action.payload;
      state.isSearching = false;
      state.status = action.payload ? "active" : "idle"; // ✅ به‌روزرسانی status
    },

    // ── Ride Status ──────────────────────────────────────────
    setRideStatus(state, action: PayloadAction<"idle" | "searching" | "active" | "completed">) {
      state.status = action.payload;
      if (action.payload === "searching") {
        state.isSearching = true;
      } else if (action.payload === "idle") {
        state.isSearching = false;
      }
    },

    // ── Update Ride Status (با rideId) ──────────────────────
    updateRideStatus(
      state,
      action: PayloadAction<{ rideId: string; status: RideStatus }>
    ) {
      const { rideId, status } = action.payload;
      if (state.currentRide && state.currentRide.id === rideId) {
        state.currentRide.status = status;
      }
      const historyRide = state.history.find(r => r.id === rideId);
      if (historyRide) {
        historyRide.status = status;
      }
    },

    // ── Complete Ride ────────────────────────────────────────
    completeRide(state) {
      if (state.currentRide) {
        state.history.unshift({
          ...state.currentRide,
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        state.currentRide = null;
        state.status = "completed"; // ✅ به‌روزرسانی status
      }
    },

    // ── History ──────────────────────────────────────────────
    setRideHistory(state, action: PayloadAction<Ride[]>) {
      state.history = action.payload;
    },

    // ── Clear All ────────────────────────────────────────────
    clearRideState(state) {
      state.currentRide = null;
      state.booking = initialState.booking;
      state.isSearching = false;
      state.status = "idle"; // ✅ reset status
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setRideType,
  setEstimate,
  resetBooking,
  setSearching,
  setCurrentRide,
  setRideStatus, // ✅ export جدید
  updateRideStatus,
  completeRide,
  setRideHistory,
  clearRideState,
} = rideSlice.actions;

export default rideSlice.reducer;