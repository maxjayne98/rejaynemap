import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  sensors: [],
  isSensorsLoading: false,
  sensorsDetail: {},
};

const airQualitySensorSlice = createSlice({
  name: "shared",
  initialState: initialState,
  reducers: {
    setSensors: (state, action) => {
      state.sensors = action.payload;
    },
    setIsSensorsLoading: (state, action) => {
      state.isSensorsLoading = action.payload;
    },
    setSensorsDetail: (state, action) => {
      state.sensorsDetail = action.payload;
    },
    updateSensorDetail: (state, action) => {
      state.sensorsDetail[action.payload.sensorName].data =
        action.payload.sensorData;
    },
  },
});

export const airQualitySensorActions = airQualitySensorSlice.actions;

export default airQualitySensorSlice.reducer;
