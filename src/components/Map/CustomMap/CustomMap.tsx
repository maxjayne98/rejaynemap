import React, { useState, useEffect, useRef, useReducer } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
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
import SwitchButton from "components/ToolBox/SwitchButton";
import FloatingMenu from "components/ToolBox/FloatingMenu";

import {
  request,
  mapStationsDataToGeoJSON,
  mapDataToGeoJSONObject,
  mapSensorsDataToGeoJSON,
} from "utils";

import {
  SwitchButtonWrapper,
  SwitchButtonWrapperLabel,
} from "./CustomMapElements";
import "./CustomMap.css";
import {
  fetchSensors,
  updateSensorDetail,
} from "redux/airQualitySensor/actions";

import {
  selectSensors,
  selectSensorsDetail,
} from "redux/airQualitySensor/selector";

const mapBoxToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN as string;
const aqicnBaseURL = process.env.REACT_APP_AQICN_API_URL as string;
const aqicnAccessToken = process.env.REACT_APP_AQICN_ACCESS_TOKEN;

const aqicnURL = (url: string) => `${aqicnBaseURL}${url}`;
mapboxgl.accessToken = mapBoxToken;

const CustomMap: React.FC = () => {
  const dispatch = useAppDispatch();
  const mapContainer = useRef<HTMLDivElement>();
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [data, setData] = useState<Array<FeatureCollection>>([]);
  const [loading, setLoading] = useState(false);

  const [stationData, setStationData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sensors = useAppSelector(selectSensors);
  const sensorsDetail = useAppSelector(selectSensorsDetail);
  const [mapLoadded, setMapLoadded] = useState(false);

  const popUpRef = useRef(
    new AnimatedPopup({
      offset: 25,
      openingAnimation: {
        duration: 1000,
        easing: "easeOutElastic",
      },
      closingAnimation: {
        duration: 300,
        easing: "easeInBack",
      },
    })
  );

  useEffect(() => {
    const sensorsName = sensors.map((item: any) => item.properties.name);
    if (sensorsName.length) fetchAllStationsDetail(sensorsName);
  }, [sensors]);

  useEffect(() => {
    dispatch(fetchSensors());
  }, []);

  useEffect(() => {
    drawSensorsOnMap(mapDataToGeoJSONObject(sensors));
    // if (sensors.length && sensors[0].geometry) {
    //   flyToPoint(sensors[0].geometry.coordinates);
    // }
  }, [sensors, mapLoadded]);

  const fetchStationDetail = async () => {
    // try {
    //   setIsLoading(true);
    //   const { data } = await request.get(aqicnURL("/map/search"));
    //   console.log("fetch api search this is data :: ", data);
    //   setIsLoading(false);
    // } catch (error) {
    //   setIsLoading(false);
    //   console.log("This is error :: ", error);
    // }
    return request.get(aqicnURL("/map/search"));
  };

  const drawSensorsDetailFromStore = () => {
    console.log("before draw :: ", sensorsDetail);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAllStationsDetail = async (sensors: any) => {
    const combinedData: any = {};
    for (const iterator of sensors) {
      // console.log("this is check in for :: ", check, checkRef);
      if (check) return;
      try {
        const { data } = await fetchStationDetail();
        // console.log("this is each sensor data :: ", data);
        dispatch(updateSensorDetail(data.data.city.name, data.data));
        combinedData[data.data.city.name] = data.data;
      } catch (e) {}
    }
    const combinedDataValues: any = Object.values(combinedData);
    drawSensorsOnMap(
      mapDataToGeoJSONObject(mapSensorsDataToGeoJSON(combinedDataValues))
    );
    flyToPoint([
      combinedDataValues[0].city.geo[1],
      combinedDataValues[0].city.geo[0],
    ]);
    console.log("got compelete !!!!!");
  };

  const drawSensorsOnMap = (sensors: {
    type: string;
    features: Array<any>;
  }) => {
    console.log("drrraw ::: ", sensors);
    if (map.current instanceof Map && map.current.getSource) {
      const getSource: GeoJSONSource = map.current.getSource(
        "random-points-data"
      ) as GeoJSONSource;
      console.log("this is maped out :: ", sensors);
      if (getSource && getSource.setData) {
        console.log("this is maped out :: in the iffff ", sensors);
        getSource.setData(sensors as any);
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

  const addFeaturePopupToMap = (feature: FeatureCollection) => {};

  const removeMap = () => {
    if (map.current && map.current.remove) {
      map.current.remove();
    }
  };

  useEffect(() => {
    if (map.current) return;
    initMap({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    addMapController(new mapboxgl.NavigationControl(), "bottom-right");
    // @ts-ignore
    if (map.current instanceof Map) {
      // @ts-ignore
      map.current.on("load", () => {
        addSourceToMap("random-points-data", {
          type: "geojson",
          data: mapDataToGeoJSONObject([]) as any,
        });
        setMapLoadded(true);

        addLayerToMap({
          id: "random-points-layer",
          source: "random-points-data",
          type: "circle",
          paint: {
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
          },
        });

        if (map.current instanceof Map) {
          map.current.on(
            "mouseenter",
            "random-points-layer",
            async (e: any) => {
              if (e.features.length) {
                const feature: FeatureCollection = e.features[0];
                const popupNode = document.createElement("div");
                ReactDOM.render(<CustomPopUp feature={feature} />, popupNode);
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
                  console.log("this is errrrrrror :: ", error);
                }
              }
            }
          );

          map.current.on("mouseleave", "random-points-layer", (e: any) => {
            try {
              popUpRef.current.remove();
            } catch (error) {
              console.log("this is errrrrrror :: ", error);
            }
          });
        }
      });
    }

    return () => {
      removeMap();
    };
  }, []);

  const checkRef = useRef(false);
  const [check, setCheck] = useState(false);
  const [poolingELid, setPoolinELid] = useState<NodeJS.Timer>();

  const checkBoxButtonOnChange = (event: any) => {
    console.log("this is checkBox value", event?.target.value);
    setCheck(!check);
    checkRef.current = !check;
  };

  useEffect(() => {
    if (check) {
      const id: NodeJS.Timer = setInterval(() => {
        dispatch(fetchSensors);
      }, 5000);
      setPoolinELid(id);
    } else {
      clearInterval(poolingELid as any);
    }
  }, [check]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 1000,
          }}
        >
          <SwitchButtonWrapper>
            <div>
              <SwitchButtonWrapperLabel>Auto </SwitchButtonWrapperLabel>
              <SwitchButtonWrapperLabel>Update</SwitchButtonWrapperLabel>
            </div>
            <SwitchButton onClick={checkBoxButtonOnChange} />
          </SwitchButtonWrapper>
        </div>
      </div>
      <div
        ref={mapContainer as React.RefObject<HTMLDivElement>}
        style={{ height: "100vh" }}
      />
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            zIndex: 1000,
          }}
        >
          <FloatingMenu></FloatingMenu>
        </div>
      </div>
    </>
  );
};

export default CustomMap;
