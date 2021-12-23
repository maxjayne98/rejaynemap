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
import {
  fetchSensors,
  fetchSensorsDetail,
} from "redux/airQualitySensor/actions";
import {
  HomeContainer,
  SwitchButtonWrapper,
  SwitchButtonWrapperLabel,
} from "./Elements";

import FloatingMenu from "components/ToolBox/FloatingMenu";
import SwitchButton from "components/ToolBox/SwitchButton";
import CustomMap from "components/Map/CustomMap";

const Home: React.FC = () => {
  const [check, setCheck] = useState(false);
  const dispatch = useAppDispatch();
  const [poolingELid, setPoolinELid] = useState<NodeJS.Timer>();
  const sensors = useAppSelector(selectSensors);
  const sensorsDetail = useAppSelector(selectSensorsDetail);

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
        <CustomMap sensors={sensors} sensorsDetail={sensorsDetail} />
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
      </HomeContainer>
    </>
  );
};

export default Home;
