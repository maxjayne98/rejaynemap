import { MapboxOptions } from "mapbox-gl";
import { ThemeKey } from "model";

export const MAP_BOX_TOKEN = process.env
  .REACT_APP_MAP_BOX_ACCESS_TOKEN as string;

export const UNAVAILABLE_PM25_SENSOR_DATA = 22000;

export const PM25_LAYER_STOPS = {
  Excellent: {
    color: "#2E7D32",
    period: [0, 15],
  },
  Good: {
    color: "#9E9D24",
    period: [15, 30],
  },
  Moderate: {
    color: "#F9A825",
    period: [30, 55],
  },
  Unhealthy: {
    color: "#D84315",
    period: [55, 110],
  },
  "Extremly Unhealthy": {
    color: "#4E342E",
    period: [110, "above"],
  },
  "Detail is Unavailable": {
    period: [1100, "above"],
    color: "black",
  },
};
export const AIR_QUALITY_SENSORS_LAYER_CONFIG = {
  layerName: "aqcin_sensors_layer",
  layerId: "aqcin_sensors_layer_id",
  sourceType: "geojson",
  defaultData: [],
  layerType: "circle",
  layerPaintConfig: {
    "circle-color": {
      property: "aqi",
      stops: Object.values(PM25_LAYER_STOPS).map((level) => [
        level.period[0],
        level.color,
      ]),
    },
    "circle-radius": 8,
    "circle-stroke-width": 2,
    "circle-stroke-color": "white",
    // "circle-stroke-color": "#141c2c",
  },
};

export const AIR_QUALITY_SENSOR_DETAIL_POPUP_CONFIG = {
  offset: 25,
  openingAnimation: {
    duration: 1000,
    easing: "easeOutElastic",
  },
  closingAnimation: {
    duration: 300,
    easing: "easeInBack",
  },
  closeButton: false,
};

export const AIR_QUALITY_MAP_INITIAL_CONFIG: MapboxOptions = {
  container: "",
  style: "mapbox://styles/mapbox/navigation-night-v1",
  center: [4.803647, 52.335214],
  zoom: 9,
  logoPosition: undefined,
  attributionControl: false,
};
export const INITIAL_BOUNDING_BOX: {
  northWestern: [number, number];
  southEastern: [number, number];
} = {
  northWestern: [52.335214, 4.803647],
  southEastern: [52.404388, 5.00861],
};

export const MAP_STYLES: { [key in ThemeKey]: string } = {
  dark: "mapbox://styles/mapbox/dark-v10",
  light: "mapbox://styles/mapbox/light-v10",
  dim: "mapbox://styles/mapbox/navigation-night-v1",
};
