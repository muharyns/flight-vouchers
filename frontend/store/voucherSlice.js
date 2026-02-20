import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk untuk check voucher
export const checkVoucher = createAsyncThunk(
  "voucher/checkVoucher",
  async ({ flightNumber, date }, { rejectWithValue }) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flightNumber, date }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("Failed to check voucher");
    }
  },
);

// Async thunk untuk generate voucher
export const generateVoucher = createAsyncThunk(
  "voucher/generateVoucher",
  async ({ name, id, flightNumber, date, aircraft }, { rejectWithValue }) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, id, flightNumber, date, aircraft }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue("Failed to generate voucher");
    }
  },
);

const voucherSlice = createSlice({
  name: "voucher",
  initialState: {
    form: { name: "", id: "", flightNumber: "", date: "", aircraft: "ATR" },
    seats: [],
    error: "",
    loading: false,
  },
  reducers: {
    setForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    reset: (state) => {
      state.seats = [];
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // checkVoucher
      .addCase(checkVoucher.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(checkVoucher.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.exists)
          state.error = "Vouchers already generated for this flight and date.";
      })
      .addCase(checkVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // generateVoucher
      .addCase(generateVoucher.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.seats = [];
      })
      .addCase(generateVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.seats = action.payload.seats || [];
      })
      .addCase(generateVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setForm, reset } = voucherSlice.actions;
export default voucherSlice.reducer;
