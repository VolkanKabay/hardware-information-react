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
  all: {
    cpu: string;
    memory: string;
    os: string;
    diskLayout: string[];
    battery: string;
    graphics: {
      controllers: [];
      displays: [];
    };
    baseboard: {
      manufacturer: string;
      model: string;
      version: string;
      serial: string;
      memSlots: number;
      memMax: number;
      assetTag: string;
    };
    bios: {
      vendor: string;
      version: string;
      releaseDate: string;
      revision: string;
      serial: string;
    };
    processes: string;
    services: string;
    users: string;
  };
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
