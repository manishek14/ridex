// src/store/slices/rideSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Ride, RideType, Location } from "@/types";

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
    },

    // ── Current Ride ─────────────────────────────────────────
    setCurrentRide(state, action: PayloadAction<Ride | null>) {
      state.currentRide = action.payload;
      state.isSearching = false;
    },

    // ✅ به‌روزرسانی وضعیت سفر جاری (با rideId)
    setRideStatus(
      state,
      action: PayloadAction<{ rideId: string; status: Ride["status"] }>
    ) {
      const { rideId, status } = action.payload;

      // به‌روزرسانی currentRide اگر همان سفر باشد
      if (state.currentRide && state.currentRide.id === rideId) {
        state.currentRide.status = status;
      }

      // به‌روزرسانی در history
      const historyRide = state.history.find(r => r.id === rideId);
      if (historyRide) {
        historyRide.status = status;
      }
    },

    // ✅ به‌روزرسانی وضعیت سفر جاری (بدون rideId - برای سفر فعلی)
    updateRideStatus(
      state,
      action: PayloadAction<{ status: Ride["status"] }>
    ) {
      if (state.currentRide) {
        state.currentRide.status = action.payload.status;
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
    },
  },
});

// ── Exports ──────────────────────────────────────────────────
export const {
  // Booking
  setOrigin,
  setDestination,
  setRideType,
  setEstimate,
  resetBooking,

  // Searching
  setSearching,

  // Current Ride
  setCurrentRide,
  setRideStatus,      // ✅ با rideId
  updateRideStatus,   // ✅ بدون rideId (برای سفر فعلی)

  // Complete
  completeRide,

  // History
  setRideHistory,

  // Clear
  clearRideState,
} = rideSlice.actions;

export default rideSlice.reducer;