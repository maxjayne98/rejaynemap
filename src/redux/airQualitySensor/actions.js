import { mapStationsDataToGeoJSON } from "utils";
import { airQualitySensorActions } from "./slice";
import api from "./api";

export const increaseCounter = (num) => airQualitySensorActions.increment(num);
export const decreaseCounter = (num) => airQualitySensorActions.decrement(num);
export const fetchSensors = () => async (dispatch) => {
  // Fetch the backend endpoint:
  try {
    const { data } = await api.getSensors();
    console.log("this is in store ::: ", data.data);
    const mapStationsDataInGeoJSON = mapStationsDataToGeoJSON(data.data);
    const sensorsDetail = mapStationsDataInGeoJSON.reduce(
      (acc, item) => ({
        ...acc,
        [item.properties.name]: {
          data: {},
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

  // Return result:
  // return data;
  // try {
  //   await api
  //     .users(1, "ir")
  //     .then((res) => dispatch(sharedActions.successUsers(res.data.results)));
  // } catch (e) {
  //   console.log("error has happend!!");
  // }
};
