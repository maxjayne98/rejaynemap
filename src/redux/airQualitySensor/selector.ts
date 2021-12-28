import type { RootState } from "redux/store";

export const selectSensors = (state: RootState) =>
  state.airQualitySensor.sensors;
export const selectIsSensorsLoading = (state: RootState) =>
  state.airQualitySensor.isSensorsLoading;
export const selectSensorsDetail = (state: RootState) =>
  state.airQualitySensor.sensorsDetail;
export const selectFetchSensorsError = (state: RootState) =>
  state.airQualitySensor.fetchSensorError;
