import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Wallet, Transaction } from "@/types";

interface WalletState {
  wallet: Wallet | null;
  isLoading: boolean;
}

const initialState: WalletState = { wallet: null, isLoading: false };

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet(state, action: PayloadAction<Wallet>) {
      state.wallet = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      if (state.wallet) {
        state.wallet.transactions.unshift(action.payload);
        if (action.payload.status === "completed") {
          state.wallet.balance += action.payload.amount;
        }
      }
    },
    updateBalance(state, action: PayloadAction<number>) {
      if (state.wallet) {
        state.wallet.balance = action.payload;
      }
    },
  },
});

export const { setWallet, setLoading, addTransaction, updateBalance } =
  walletSlice.actions;
export default walletSlice.reducer;
