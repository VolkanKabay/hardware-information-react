import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../api/backend";
import { AppThunk } from "../store";

interface SystemInfo {
  cpu: string;
  memory: string;
  os: string;
  diskLayout: string[];
  battery: string;
  graphics: string;
  processes: string;
  services: string;
  users: string;
}

interface SystemInfoState {
  systemInfo: SystemInfo | undefined;
  loading: boolean;
  error: string | null;
}

export const fetchSystemInfo = createAsyncThunk(
  "systemInfo/fetchSystemInfo",
  async () => {
    const response = await get("/systeminfo");
    console.log("API Response:", response);
    return response;
  }
);

export const initialState: SystemInfoState = {
  systemInfo: undefined,
  loading: false,
  error: null,
};

export const systemInfoSlice = createSlice({
  name: "systemInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSystemInfo.fulfilled, (state, action) => {
        state.systemInfo = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSystemInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export const selectSystemInfo = (): AppThunk => async (dispatch) => {
  dispatch(fetchSystemInfo());
};

export default systemInfoSlice.reducer;
