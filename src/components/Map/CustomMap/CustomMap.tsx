import React, { useState, useEffect, useRef, useReducer } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import mapboxgl, { Map, GeoJSONSource, LngLatLike } from "mapbox-gl";
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
} from "utils";
import {
  SwitchButtonWrapper,
  SwitchButtonWrapperLabel,
} from "./CustomMapElements";
import "./CustomMap.css";
import { fetchSensors } from "redux/airQualitySensor/actions";

import { selectSensors } from "redux/airQualitySensor/selector";

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
  useEffect(() => {
    console.log("this is sensors", sensors);
    return () => {};
  }, [sensors]);
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

  const [mapLoadded, setMapLoadded] = useState(false);

  const fetchStationDetails = async () => {
    try {
      const { data } = await request.get(aqicnURL("/map/bounds"));
      setData(mapStationsDataToGeoJSON(data.data));
      console.log("fetch api this is data :: ", data);
    } catch (error) {
      console.log("This is error :: ", error);
    }
  };
  const fetchStationDetail = async () => {
    try {
      setIsLoading(true);
      const { data } = await request.get(aqicnURL("/map/search"));
      console.log("fetch api search this is data :: ", data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("This is error :: ", error);
    }
  };

  useEffect(() => {
    fetchStationDetails();
    dispatch(fetchSensors());
  }, []);

  useEffect(() => {
    if (map.current instanceof Map && mapLoadded && sensors.length) {
      const { lng, lat } = map.current.getCenter();
      if (map.current.getSource) {
        const getSource: GeoJSONSource = map.current.getSource(
          "random-points-data"
        ) as GeoJSONSource;
        console.log("this is maped out :: ", mapDataToGeoJSONObject(sensors));
        getSource.setData(mapDataToGeoJSONObject(sensors) as any);
        // map.current.setCenter(data[0].geometry.coordinates)
        if (sensors[0].geometry) {
          map.current.flyTo({
            center: sensors[0].geometry.coordinates,
          });
        }
      }
    }
  }, [sensors, mapLoadded]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current &&
      map.current.addControl &&
      map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.current.on("load", () => {
      if (map.current instanceof Map) {
        map.current.addSource("random-points-data", {
          type: "geojson",
          //REFACTOR CORRECT TYPE
          data: mapDataToGeoJSONObject([]) as any,
        });
        setMapLoadded(true);
      }
      if (map.current instanceof Map) {
        map.current.addLayer({
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
      }
      if (map.current instanceof Map) {
        map.current.on("mouseenter", "random-points-layer", async (e: any) => {
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
        });

        map.current.on("mouseleave", "random-points-layer", (e: any) => {
          try {
            popUpRef.current.remove();
          } catch (error) {
            console.log("this is errrrrrror :: ", error);
          }
        });
      }
    });
    return () => {
      if (map.current && map.current.remove) {
        map.current.remove();
      }
    };
  }, []);
  const [check, setCheck] = useState(false);
  const [poolingELid, setPoolinELid] = useState<NodeJS.Timer>();
  const checkBoxButtonOnChange = (event: any) => {
    console.log("this is checkBox value", event?.target.value);
    setCheck(!check);
  };
  useEffect(() => {
    if (check) {
      const id: NodeJS.Timer = setInterval(() => {
        fetchStationDetails();
      }, 5000);
      setPoolinELid(id);
    } else {
      clearInterval(poolingELid as any);
    }
  }, [check]);
  return (
    <>
      {/* <input
        type="checkbox"
        checked={check}
        onChange={checkBoxButtonOnChange}
      /> */}
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
            <SwitchButton />
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
          <FloatingMenu>
            <div>salam</div>
            <ul>
              <li>salam 2</li>
              <li>salam 3</li>
            </ul>
          </FloatingMenu>
        </div>
      </div>
    </>
  );
};

export default CustomMap;
