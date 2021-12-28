import React, { useState, useEffect, useRef } from "react";
import mapboxgl, {
  Map,
  GeoJSONSource,
  MapboxOptions,
  Control,
  IControl,
} from "mapbox-gl";
import ReactDOM from "react-dom";
import { FeatureCollection } from "model";
import AnimatedPopup from "components/Map/AnimatedPopup/";
import CustomPopUp from "components/Map/CustomPopup";
import { mapDataToGeoJSONObject, mapSensorsDataToGeoJSON } from "utils";
import {
  AIR_QUALITY_SENSORS_LAYER_CONFIG,
  AIR_QUALITY_SENSOR_DETAIL_POPUP_CONFIG,
  MAP_BOX_TOKEN,
  AIR_QUALITY_MAP_INITIAL_CONFIG,
  MAP_STYLES,
  isSameObject,
} from "utils";
import { useIsMount } from "hooks/useIsMount";
import { usePrevious } from "hooks/usePrevious";
import "./CustomMap.css";

mapboxgl.accessToken = MAP_BOX_TOKEN;

const CustomMap: React.FC<{
  sensors: any;
  sensorsDetail: any;
  themeName: "light" | "dark" | "dim";
}> = ({ sensors, sensorsDetail, themeName }) => {
  const mapContainer = useRef<HTMLDivElement>();
  const map = useRef<Map | null>(null);
  const [isMapInitiated, setIsMapInitiated] = useState(false);
  const isStyleLoadedRef = useRef(false);
  const [mapLoadded, setMapLoadded] = useState(false);
  const pervSensors = usePrevious(sensors);
  const popUpRef = useRef(
    new AnimatedPopup(AIR_QUALITY_SENSOR_DETAIL_POPUP_CONFIG)
  );

  useEffect(() => {
    if (mapLoadded) {
      if (map.current instanceof Map && !isSameObject(sensors, pervSensors))
        setAirQualitySensorOnMap(mapDataToGeoJSONObject(sensors));
      if (sensors.length && sensors[0].geometry) {
        flyToPoint(sensors[0].geometry.coordinates);
      }
    }
  }, [sensors, mapLoadded]);

  useIsMount(() => {
    if (map.current instanceof Map) map.current.setStyle(MAP_STYLES[themeName]);
    isStyleLoadedRef.current = false;
    setMapLoadded(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeName]);

  useEffect(() => {
    mapLoadded && drawSensorOnMap();
  }, [sensorsDetail, mapLoadded]);

  const drawSensorOnMap = () => {
    const combinedDataValues: any = Object.values(sensorsDetail)
      .filter((sensorDetail: any) => sensorDetail.data)
      .map((sensorDetail: any) => sensorDetail.data);
    setAirQualitySensorOnMap(
      mapDataToGeoJSONObject(mapSensorsDataToGeoJSON(combinedDataValues))
    );
  };

  const setAirQualitySensorOnMap = (sensors: {
    type: string;
    features: Array<any>;
  }) => {
    if (map.current instanceof Map && map.current.getSource) {
      const getSource: GeoJSONSource = map.current.getSource(
        AIR_QUALITY_SENSORS_LAYER_CONFIG.layerName
      ) as GeoJSONSource;
      if (getSource && getSource.setData) {
        getSource.setData(sensors as any);
      } else {
        console.log("air quality source is not found !!", getSource);
      }
    }
  };

  const flyToPoint = (coordinates: [number, number]) => {
    if (map.current instanceof Map) {
      map.current.flyTo({
        center: coordinates,
      });
    }
  };

  const initMap = (options: MapboxOptions) => {
    map.current = new mapboxgl.Map(options);
  };

  const addMapController = (
    control: Control | IControl,
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  ) => {
    if (map.current instanceof Map) {
      map.current.addControl(control, position);
    }
  };

  const addLayerToMap = (options: any) => {
    if (map.current instanceof Map) {
      map.current.addLayer(options);
    }
  };

  const addSourceToMap = (layerName: string, options: any) => {
    if (map.current instanceof Map) {
      map.current.addSource(layerName, options);
    }
  };

  const removeMap = () => {
    if (map.current && map.current.remove) {
      map.current.remove();
    }
  };

  useEffect(() => {
    if (map.current) return;
    initMap({
      ...AIR_QUALITY_MAP_INITIAL_CONFIG,
      container: mapContainer.current || "",
      style: MAP_STYLES[themeName],
    });
    addMapController(new mapboxgl.NavigationControl(), "top-right");
    if (!isMapInitiated) setIsMapInitiated(true);
    return () => {
      removeMap();
    };
  }, []);

  const addPM25SourceAndData = () => {
    addSourceToMap(AIR_QUALITY_SENSORS_LAYER_CONFIG.layerName, {
      type: AIR_QUALITY_SENSORS_LAYER_CONFIG.sourceType,
      data: AIR_QUALITY_SENSORS_LAYER_CONFIG.defaultData,
    });
    addLayerToMap({
      id: AIR_QUALITY_SENSORS_LAYER_CONFIG.layerId,
      source: AIR_QUALITY_SENSORS_LAYER_CONFIG.layerName,
      type: AIR_QUALITY_SENSORS_LAYER_CONFIG.layerType,
      paint: AIR_QUALITY_SENSORS_LAYER_CONFIG.layerPaintConfig,
    });
    setMapLoadded(true);
  };

  useEffect(() => {
    if (map.current instanceof Map && isMapInitiated) {
      // @ts-ignore
      map.current.on("load", () => {
        if (map.current instanceof Map) {
          map.current.on(
            "mouseenter",
            AIR_QUALITY_SENSORS_LAYER_CONFIG.layerId,
            async (e: any) => {
              if (e.features.length) {
                const feature: FeatureCollection = e.features[0];
                const popupNode = document.createElement("div");
                ReactDOM.render(
                  <CustomPopUp feature={feature} detail={feature.properties} />,
                  popupNode
                );
                const coordinates = e.features[0].geometry.coordinates.slice();
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                  coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                try {
                  popUpRef.current
                    .setLngLat(coordinates)
                    .setDOMContent(popupNode)
                    .addTo(map.current as Map);
                } catch (error) {
                  console.log("add map popup error :: :: ", error);
                }
              }
            }
          );
          map.current.on(
            "mouseleave",
            AIR_QUALITY_SENSORS_LAYER_CONFIG.layerId,
            (e: any) => {
              try {
                popUpRef.current.remove();
              } catch (error) {
                console.log("remove map popup error :: :: ", error);
              }
            }
          );
        }
      });
      map.current.on("styledata", () => {
        if (!isStyleLoadedRef.current) {
          console.log("&&&");
          isStyleLoadedRef.current = true;
          addPM25SourceAndData();
        }
      });
    }
  }, [isMapInitiated]);

  return (
    <>
      <div
        ref={mapContainer as React.RefObject<HTMLDivElement>}
        style={{ height: "100vh" }}
      />
    </>
  );
};

export default CustomMap;
