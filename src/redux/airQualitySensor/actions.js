import { mapStationsDataToGeoJSON } from "utils";
import { airQualitySensorActions } from "./slice";
import api from "./api";

export const increaseCounter = (num) => airQualitySensorActions.increment(num);
export const decreaseCounter = (num) => airQualitySensorActions.decrement(num);

export const fetchSensors =
  (northWestern = [0, 0], southEastern = [0, 0]) =>
  async (dispatch) => {
    // Fetch the backend endpoint:
    try {
      const { data } = await api.getSensors(northWestern, southEastern);
      console.log("this is in store ::: ", data.data);
      const mapStationsDataInGeoJSON = mapStationsDataToGeoJSON(data.data);
      const sensorsDetail = mapStationsDataInGeoJSON.reduce(
        (acc, item) => ({
          ...acc,
          [item.properties.name]: {
            data: null,
            geometry: item.geometry.coordinates,
          },
        }),
        {}
      );
      console.log("sensorsDetail ::: ", sensorsDetail);
      dispatch(airQualitySensorActions.setSensors(mapStationsDataInGeoJSON));
      dispatch(airQualitySensorActions.setSensorsDetail(sensorsDetail));
    } catch (e) {
      console.log("this is errror :::");
    }
  };

export const updateSensorDetail = (name, data) =>
  airQualitySensorActions.updateSensorDetail({
    sensorName: name,
    sensorData: data,
  });
