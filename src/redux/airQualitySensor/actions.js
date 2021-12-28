import { mapStationsDataToGeoJSON } from "utils";
import { airQualitySensorActions } from "./slice";
import api from "./api";

export const increaseCounter = (num) => airQualitySensorActions.increment(num);
export const decreaseCounter = (num) => airQualitySensorActions.decrement(num);

export const fetchSensors =
  (northWestern = [0, 0], southEastern = [0, 0]) =>
  async (dispatch) => {
    // Fetch the backend endpoint:
    dispatch(airQualitySensorActions.setIsSensorsLoading(true));
    try {
      const { data } = await api.getSensorsWithBoundingBox(
        northWestern,
        southEastern
      );
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
      dispatch(airQualitySensorActions.setSensors(mapStationsDataInGeoJSON));
      dispatch(airQualitySensorActions.setSensorsDetail(sensorsDetail));
    } catch (e) {
      console.log("this is errror :::", e);
    }
    dispatch(airQualitySensorActions.setIsSensorsLoading(false));
  };

export const fetchSensorsDetail = (sensorsName) => async (dispatch) => {
  for (let i = 0; i < sensorsName.length; i += 3) {
    const sensors = sensorsName.slice(i, i + 3);
    await (async (sensors, dispatch) => {
      const chunk = sensors.map((name) => {
        // return retry(name, 0, 3)();
        return api.getSensorDetailByName(name);
      });
      try {
        const responses = await Promise.all(chunk);
        const sesorsDetail = responses.map(({ data }) => ({
          sensorName: data.data.city.name,
          sensorData: data.data,
        }));
        dispatch(airQualitySensorActions.updateSensorsDetail(sesorsDetail));
      } catch (e) {}
    })(sensors, dispatch);
  }
  // for (const name of sensorsName) {
  //   try {
  //     const { data } = await api.getSensorDetailByName(name);
  //     dispatch(
  //       airQualitySensorActions.updateSensorDetail({
  //         sensorName: data.data.city.name,
  //         sensorData: data.data,
  //       })
  //     );
  //   } catch (e) {}
  // }
};
