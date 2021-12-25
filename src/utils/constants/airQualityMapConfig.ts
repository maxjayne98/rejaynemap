import { MapboxOptions } from "mapbox-gl";
import { ThemeKey } from "model";

export const MAP_BOX_TOKEN = process.env
  .REACT_APP_MAP_BOX_ACCESS_TOKEN as string;
export const AIR_QUALITY_SENSORS_LAYER_CONFIG = {
  layerName: "aqcin_sensors_layer",
  layerId: "aqcin_sensors_layer_id",
  sourceType: "geojson",
  defaultData: [],
  layerType: "circle",
  layerPaintConfig: {
    "circle-color": {
      property: "aqi",
      stops: [
        [0, "#2E7D32"],
        [15, "#9E9D24"],
        [30, "#F9A825"],
        [55, "#D84315"],
        [110, "#4E342E"],
        [10000, "#0a4efc"],
        [22000, "pink"],
      ],
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
  // style: "mapbox://styles/mapbox/dark-v10",
  // style: "mapbox://styles/mapbox/light-v10",
  container: "",
  style: "mapbox://styles/mapbox/navigation-night-v1",
  center: [4.803647, 52.335214],
  zoom: 9,
  logoPosition: undefined,
  attributionControl: false,
};

export const mapStyles: { [key in ThemeKey]: string } = {
  dark: "mapbox://styles/mapbox/dark-v10",
  light: "mapbox://styles/mapbox/light-v10",
  dim: "mapbox://styles/mapbox/navigation-night-v1",
};
