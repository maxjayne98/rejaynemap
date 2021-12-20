import { request } from "utils";
import { aqicnURLGenerator } from "redux/airQualitySensor/url";
const api = {
  getSensors: (northWestern = [0, 0], southEastern = [0, 0]) => {
    return request({
      url: `${aqicnURLGenerator(
        `/map/bounds/?latlng=${northWestern[0]},${northWestern[1]},${southEastern[0]},${southEastern[1]}&`
      )}`,
      // url: "map/bounds",
      method: "GET",
    });
  },
  getSensorDetail: (name = "") => {
    return request({
      // url: `${aqicnURLGenerator()}`,
      url: "map/search",
      method: "GET",
    });
  },
};

export default api;
