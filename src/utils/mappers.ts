import { StationResponse, FeatureCollection } from "../model";

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

export const mapDataToGeoJSONObject = (
  features: any,
  type: string = "FeatureCollection"
): { type: string; features: Array<any> } => {
  return {
    type: type,
    features: features,
  };
};
