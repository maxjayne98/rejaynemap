import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useCallback,
} from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  selectSensors,
  selectSensorsDetail,
} from "redux/airQualitySensor/selector";
import { selectThemeName } from "redux/theme/selector";
import {
  fetchSensors,
  fetchSensorsDetail,
} from "redux/airQualitySensor/actions";
import {
  HomeContainer,
  SwitchButtonWrapper,
  SwitchButtonWrapperLabel,
} from "./Elements";
import { mapStyles } from "utils";
import SettingsFloatingMneu from "components/HomePage/SettingsFloatingMenu/SettingsFloatingMenu";
import SwitchButton from "components/ToolBox/SwitchButton";
import CustomMap from "components/HomePage/CustomMap";

const Home: React.FC = () => {
  const [check, setCheck] = useState(false);
  const dispatch = useAppDispatch();
  const [poolingELid, setPoolinELid] = useState<NodeJS.Timer>();
  const sensors = useAppSelector(selectSensors);
  const sensorsDetail = useAppSelector(selectSensorsDetail);
  const themeName = useAppSelector(selectThemeName);
  const mapStyle = mapStyles[themeName];

  useEffect(() => {
    if (check) {
      const id: NodeJS.Timer = setInterval(() => {
        const sensorsName = sensors.map((item: any) => item.properties.name);
        dispatch(fetchSensorsDetail(sensorsName));
      }, 10000);
      setPoolinELid(id);
    } else {
      clearInterval(poolingELid as any);
    }
  }, [check]);

  useEffect(() => {
    const sensorsName = sensors.map((item: any) => item.properties.name);
    if (sensorsName.length) dispatch(fetchSensorsDetail(sensorsName));
  }, [sensors]);

  useEffect(() => {
    dispatch(fetchSensors([52.335214, 4.803647], [52.404388, 5.00861]));
  }, []);

  const checkBoxButtonOnChange = useCallback(() => {
    setCheck((check) => !check);
  }, [setCheck]);

  return (
    <>
      <HomeContainer>
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
        <CustomMap
          sensors={sensors}
          sensorsDetail={sensorsDetail}
          // style: "mapbox://styles/mapbox/dark-v10",
          // style: "mapbox://styles/mapbox/light-v10",
          // mapStyle="mapbox://styles/mapbox/navigation-night-v1"
          mapStyle={mapStyle}
        />
        <SettingsFloatingMneu />
      </HomeContainer>
    </>
  );
};

export default Home;
