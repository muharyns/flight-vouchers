import { configureStore } from "@reduxjs/toolkit";
import voucherReducer from "./voucherSlice";

export const store = configureStore({
  reducer: {
    voucher: voucherReducer,
  },
});
