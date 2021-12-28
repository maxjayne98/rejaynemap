import { request, retry } from "utils";
import { aqicnURLGenerator } from "redux/airQualitySensor/url";
const api = {
  getSensorsWithBoundingBox: (
    northWestern: [number, number] = [0, 0],
    southEastern: [number, number] = [0, 0]
  ): Promise<any> => {
    return retry(
      async () =>
        request({
          url: `${aqicnURLGenerator(
            `/map/bounds/?latlng=${northWestern[0]},${northWestern[1]},${southEastern[0]},${southEastern[1]}&`
          )}`,
          method: "GET",
        }),
      { until: 5 }
    );
  },
  getSensorDetailByName: (name: string = ""): Promise<any> => {
    return retry(
      async () =>
        request({
          url: aqicnURLGenerator(`/feed/${name}/?`),
          method: "GET",
        }),
      { until: 5 }
    );
  },
};

export default api;
