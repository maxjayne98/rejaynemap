import React, { useState, useEffect, useRef, useReducer } from "react";
import { HomeContainer } from "./Elements";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import mapboxgl, { Map, GeoJSONSource, LngLatLike } from 'mapbox-gl'
import { request } from '../../utils'
import ReactDOM from "react-dom";
import { FeatureCollection } from "../../model";
import AnimatedPopup from './AnimatedPopUp'
import CustomPopUp from '../../components/Map/CustomPopup'
import { mapStationsDataToGeoJSON, mapDataToGeoJSONObject } from "../../utils";
import './Home.css'

const mapBoxToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN as string;
const aqicnBaseURL = process.env.REACT_APP_AQICN_API_URL as string
const aqicnAccessToken = process.env.REACT_APP_AQICN_ACCESS_TOKEN

const aqicnURL = (url: string) => `${aqicnBaseURL}${url}`
mapboxgl.accessToken = mapBoxToken


const Marker = ({ id }: { id: string | number }) => <div id={`marker-${id}`} className="marker" />;



const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const mapContainer = useRef<HTMLDivElement>();
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [data, setData] = useState<Array<FeatureCollection>>([])
  const [loading, setLoading] = useState(false)
  const popUpRef = useRef(new AnimatedPopup({
    offset: 25,
    openingAnimation: {
      duration: 1000,
      easing: 'easeOutElastic'
    },
    closingAnimation: {
      duration: 300,
      easing: 'easeInBack'
    }
  }).setText(
    'Construction on the Washington Monument began in 1848.'
  ));

  const [mapLoadded, setMapLoadded] = useState(false)

  const fetchStationDetails = async () => {
    try {
      const { data } = await request.get(aqicnURL("/map/bounds"))
      setData(mapStationsDataToGeoJSON(data.data))
      console.log("fetch api this is data :: ", data)
    } catch (error) {
      console.log("This is error :: ", error)
    }
  }

  useEffect(() => {
    fetchStationDetails()
  }, [])

  useEffect(() => {
    if (map.current instanceof Map && mapLoadded) {
      const { lng, lat } = map.current.getCenter();
      if (map.current.getSource) {
        const getSource: GeoJSONSource = map.current.getSource('random-points-data') as GeoJSONSource
        getSource.setData(mapDataToGeoJSONObject(data) as any);
        // map.current.setCenter(data[0].geometry.coordinates)
        map.current.flyTo({
          center: data[0].geometry.coordinates
        });


      }
    }
  }, [data, mapLoadded])

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    map.current && map.current.addControl && map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.current.on('load', () => {
      if (map.current instanceof Map) {
        map.current.addSource('random-points-data', {
          type: 'geojson',
          //REFACTOR CORRECT TYPE
          data: mapDataToGeoJSONObject([]) as any
        });
        setMapLoadded(true)
      }
      if (map.current instanceof Map) {
        map.current.addLayer({
          id: 'random-points-layer',
          source: 'random-points-data',
          type: 'circle',
          'paint': {
            'circle-color': {
              'property': 'aqi',
              'stops': [
                [0, '#f1f075'],
                [30, '#e55e5e'],
                [50, '#355e5e'],
                [70, '#255e5e'],
                [90, '#e54e5e'],
                [100, '#e55e0e'],
              ]
            }
          }
        });
      }
      if (map.current instanceof Map) {
        map.current.on('click', 'random-points-layer', (e: any) => {
          if (e.features.length) {
            const feature: FeatureCollection = e.features[0];
            const popupNode = document.createElement('div');
            ReactDOM.render(<CustomPopUp feature={feature} />, popupNode);
            try {
              popUpRef.current.setLngLat(feature.geometry.coordinates).setDOMContent(popupNode).addTo(map.current as Map);
            } catch (error) {
              console.log("this is errrrrrror :: ", error)
            }
          }
        });
      }
    });
    return () => {
      if (map.current && map.current.remove) {
        map.current.remove()
      }
    }
  }, []);

  return (
    <>
      <HomeContainer>
        <div ref={mapContainer as React.RefObject<HTMLDivElement>} style={{ height: "100vh" }} />
      </HomeContainer>
    </>
  );
};

export default Home;
