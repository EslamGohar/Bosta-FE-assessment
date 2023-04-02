import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchShipment = createAsyncThunk(
  "shipment/fetchShipment",
  async (trackingNumber, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `https://tracking.bosta.co/shipments/track/${trackingNumber}`
      );
      const data = res.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const shipsSlice = createSlice({
  name: "shipment",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchShipment.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchShipment.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error;
      });
  },
});

export default shipsSlice.reducer;
