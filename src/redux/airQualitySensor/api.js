import { request } from "utils";
import { aqicnURLGenerator } from "redux/airQualitySensor/url";
const api = {
  getSensorsWithBoundingBox: (northWestern = [0, 0], southEastern = [0, 0]) => {
    return request({
      url: `${aqicnURLGenerator(
        `/map/bounds/?latlng=${northWestern[0]},${northWestern[1]},${southEastern[0]},${southEastern[1]}&`
      )}`,
      method: "GET",
    });
  },
  getSensorDetailByName: (name = "") => {
    return request({
      url: aqicnURLGenerator(`/feed/${name}/?`),
      method: "GET",
    });
  },
};

export default api;
