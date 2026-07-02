// src/store/slices/walletSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Transaction, Wallet } from "@/types";

interface WalletState {
  balance: number;
  wallet: Wallet | null; 
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  balance: 0,
  wallet: null,
  transactions: [],
  isLoading: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    // ✅ setWallet برای تنظیم کل کیف پول
    setWallet(state, action: PayloadAction<Wallet>) {
      state.wallet = action.payload;
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions || [];
    },
    updateBalance(state, action: PayloadAction<number>) {
      state.balance += action.payload;
      if (state.wallet) {
        state.wallet.balance = state.balance;
      }
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
      if (state.wallet) {
        state.wallet.balance = action.payload;
      }
    },
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
      if (state.wallet) {
        state.wallet.transactions = action.payload;
      }
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactions.unshift(action.payload);
      if (state.wallet) {
        state.wallet.transactions = [action.payload, ...(state.wallet.transactions || [])];
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetWallet(state) {
      state.balance = 0;
      state.wallet = null;
      state.transactions = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  setWallet,      // ✅ export کردن setWallet
  updateBalance,
  setBalance,
  setTransactions,
  addTransaction,
  setLoading,
  setError,
  resetWallet,
} = walletSlice.actions;

export default walletSlice.reducer;