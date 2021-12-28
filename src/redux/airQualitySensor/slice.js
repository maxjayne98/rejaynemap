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
    updateSensorsDetail: (state, action) => {
      action.payload.forEach(({ sensorName, sensorData }) => {
        state.sensorsDetail[sensorName].data = sensorData;
      });
    },
  },
});

export const airQualitySensorActions = airQualitySensorSlice.actions;

export default airQualitySensorSlice.reducer;
