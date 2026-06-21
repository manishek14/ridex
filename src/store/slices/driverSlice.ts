import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Driver, DriverStatus, Ride } from "@/types";

interface DriverState {
  profile: Driver | null;
  status: DriverStatus;
  currentRide: Ride | null;
  todayEarnings: number;
  todayRides: number;
}

const initialState: DriverState = {
  profile: null,
  status: "offline",
  currentRide: null,
  todayEarnings: 0,
  todayRides: 0,
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    setDriverProfile(state, action: PayloadAction<Driver>) {
      state.profile = action.payload;
      state.status = action.payload.status;
    },
    setDriverStatus(state, action: PayloadAction<DriverStatus>) {
      state.status = action.payload;
      if (state.profile) state.profile.status = action.payload;
    },
    setCurrentRide(state, action: PayloadAction<Ride | null>) {
      state.currentRide = action.payload;
    },
    completeRide(state, action: PayloadAction<number>) {
      state.currentRide = null;
      state.todayEarnings += action.payload;
      state.todayRides += 1;
    },
    setTodayStats(
      state,
      action: PayloadAction<{ earnings: number; rides: number }>
    ) {
      state.todayEarnings = action.payload.earnings;
      state.todayRides = action.payload.rides;
    },
  },
});

export const {
  setDriverProfile,
  setDriverStatus,
  setCurrentRide,
  completeRide,
  setTodayStats,
} = driverSlice.actions;
export default driverSlice.reducer;
