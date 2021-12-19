import {
  StationResponse,
  FeatureCollection,
  StationDetailResponse,
} from "../model";

export const mapStationsDataToGeoJSON = (
  stations: Array<StationResponse>
): Array<FeatureCollection> =>
  stations.map(
    ({ lon, lat, uid, station, aqi }: StationResponse): FeatureCollection => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [lon, lat],
      },
      properties: {
        id: uid,
        name: station.name,
        aqi: Number(aqi),
      },
    })
  );

export const mapSensorsDataToGeoJSON = (
  sensors: Array<StationDetailResponse>
): Array<FeatureCollection> =>
  sensors.map(
    (sensor: StationDetailResponse): FeatureCollection => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: sensor.city.geo as any,
      },
      properties: {
        id: sensor.idx,
        name: sensor.city.name,
        ...sensor,
        aqi: Number(sensor.iaqi.pm25.v),
      },
    })
  );

export const mapDataToGeoJSONObject = (
  features: any,
  type: string = "FeatureCollection"
): { type: string; features: Array<any> } => {
  return {
    type: type,
    features: features,
  };
};
