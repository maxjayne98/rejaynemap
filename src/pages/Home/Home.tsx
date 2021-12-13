import React, { useState, useEffect, useRef, useReducer } from "react";
import { HomeContainer } from "./Elements";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import mapboxgl, { Map, GeoJSONSource, LngLatLike } from 'mapbox-gl'
import { request } from '../../utils'
import './Home.css'
import ReactDOM from "react-dom";
import { StationsResponse, FeatureCollection } from "../../model";
import fetchFakeData from "./fakeData";
import PopUp from './PopUp'

const mapBoxToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN as string;
const aqicnBaseURL = process.env.REACT_APP_AQICN_API_URL as string
const aqicnAccessToken = process.env.REACT_APP_AQICN_ACCESS_TOKEN

const aqicnURL = (url: string) => `${aqicnBaseURL}${url}&token=${aqicnAccessToken}`
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
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }).setHTML());
  const [mapLoadded, setMapLoadded] = useState(false)

  const fetchStationDetails = async () => {
    try {
      const { data } = await request.get(aqicnURL("/map/bounds/?latlng=39.379436,116.091230,40.235643,116.784382"))
      setData(data.data.map(({ lon, lat, uid }: StationsResponse) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [lon, lat],
          },
          properties: {
            id: uid,
            name: `Random Point #${uid}`,
            description: `description for Random Point #${uid}`,
          },
        }
      }))
      console.log("this is data :: ", data.data)
    } catch (error) {
      console.log("This is error :: ", error)
    }
  }

  useEffect(() => {
    fetchStationDetails()
  }, [])

  useEffect(() => {
    if (Array.isArray(data)) {
      // data.forEach(({ lon, lat, uid }: StationsResponse) => {
      //   if (map && map.current) {
      //     const markerNode = document.createElement('div');
      //     ReactDOM.render(<Marker id={uid} />, markerNode);
      //     new mapboxgl.Marker(markerNode)
      //       .setLngLat([lon, lat])
      //       .addTo(map.current);
      //   }
      // })
      if (map.current instanceof Map && mapLoadded) {
        const { lng, lat } = map.current.getCenter();
        // fetch new data

        // update "random-points-data" source with new data
        // all layers that consume the "random-points-data" data source will be updated automatically
        if (map.current.getSource) {
          const getSource: GeoJSONSource = map.current.getSource('random-points-data') as GeoJSONSource
          const featureData =
          {
            "type": "FeatureCollection",
            "features": data
          }

          console.log(map.current.getSource('random-points-data'), data as any)
          getSource.setData(featureData as any);

        }
      }
    }
  }, [data, mapLoadded])

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    map.current && map.current.addControl && map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.current.on('load', () => {
      // add the data source for new a feature collection with no features
      console.log("call me on load !!")
      if (map.current instanceof Map) {
        console.log("call me on source !!")
        map.current.addSource('random-points-data', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [],
          },
        });
        setMapLoadded(true)
      }
      // now add the layer, and reference the data source above by name
      if (map.current instanceof Map) {
        console.log("call me on layer !!")
        map.current.addLayer({
          id: 'random-points-layer',
          source: 'random-points-data',
          type: 'symbol',
          layout: {
            // full list of icons here: https://labs.mapbox.com/maki-icons
            'icon-image': 'bakery-15', // this will put little croissants on our map
            'icon-padding': 0,
            'icon-allow-overlap': true,
          },
        });
      }
      if (map.current instanceof Map) {
        map.current.on('click', 'random-points-layer', (e: any) => {
          if (e.features.length) {
            const feature: FeatureCollection = e.features[0];
            // create popup node
            const popupNode = document.createElement('div');
            const popupProps = { feature }
            ReactDOM.render(<div></div>, popupNode);
            // set popup on map
            try {
              console.log(feature.geometry.coordinates)
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
        // REFACTOR :: Write shorthand form !!
        map.current.remove()
      }
    }
  }, []);

  useEffect(() => {
    if (map && map.current) return
    else if (map.current instanceof Map) {
      // map.current.on('load', () => {
      //   // add the data source for new a feature collection with no features
      //   console.log("call me on load !!")
      //   if (map.current instanceof Map) {
      //     map.current.addSource('random-points-data', {
      //       type: 'geojson',
      //       data: {
      //         type: 'FeatureCollection',
      //         features: [],
      //       },
      //     });
      //   }
      //   // now add the layer, and reference the data source above by name
      //   if (map.current instanceof Map)
      //     map.current.addLayer({
      //       id: 'random-points-layer',
      //       source: 'random-points-data',
      //       type: 'symbol',
      //       layout: {
      //         // full list of icons here: https://labs.mapbox.com/maki-icons
      //         'icon-image': 'bakery-15', // this will put little croissants on our map
      //         'icon-padding': 0,
      //         'icon-allow-overlap': true,
      //       },
      //     });
      // });
    }
  })

  return (
    <>
      <HomeContainer>
        <div ref={mapContainer as React.RefObject<HTMLDivElement>} style={{ height: "100vh" }} />
      </HomeContainer>
    </>
  );
};

export default Home;
