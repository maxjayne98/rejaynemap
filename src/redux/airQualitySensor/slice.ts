import { StationResponse, StationDetailResponse } from "model";
import { createSlice } from "@reduxjs/toolkit";

interface States {
  sensors: Array<StationResponse>;
  isSensorsLoading: boolean;
  fetchSensorError: string;
  sensorsDetail: { [key in string]: { data: StationDetailResponse } };
}

const initialState: States = {
  sensors: [],
  isSensorsLoading: false,
  fetchSensorError: "",
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
    setFetchSensorsError: (state, action) => {
      state.fetchSensorError = action.payload;
    },
    updateSensorDetail: (state, action) => {
      state.sensorsDetail[action.payload.sensorName].data =
        action.payload.sensorData;
    },
    updateSensorsDetail: (
      state,
      action: {
        payload: Array<{
          sensorName: string;
          sensorData: StationDetailResponse;
        }>;
      }
    ) => {
      action.payload.forEach(({ sensorName, sensorData }) => {
        state.sensorsDetail[sensorName].data = sensorData;
      });
    },
  },
});

export const airQualitySensorActions = airQualitySensorSlice.actions;

export default airQualitySensorSlice.reducer;
