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
  selectIsSensorsLoading,
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
  MapLegendIcon,
  FullPageLoadingContainer,
  FullPageLoadingContent,
} from "./Elements";
import { mapStyles } from "utils";
import SettingsFloatingMneu from "components/HomePage/SettingsFloatingMenu/SettingsFloatingMenu";
import SwitchButton from "components/ToolBox/SwitchButton";
import CustomMap from "components/HomePage/CustomMap";
import MapLegend from "components/HomePage/MapLegend";
import { PM25_LAYER_STOPS } from "utils";
import Loading from "components/Lottie";

const legendOptions = Object.keys(PM25_LAYER_STOPS).map((level: string) => ({
  name: level,
  tip:
    level === "Detail is Unavailable"
      ? ""
      : //@ts-ignore
        `(${PM25_LAYER_STOPS[level].period[0]} - ${PM25_LAYER_STOPS[level].period[1]})`,
  //@ts-ignore
  element: <MapLegendIcon color={PM25_LAYER_STOPS[level].color} />,
}));

const Home: React.FC = () => {
  const [check, setCheck] = useState(false);
  const dispatch = useAppDispatch();
  const [poolingELid, setPoolinELid] = useState<NodeJS.Timer>();
  const sensors = useAppSelector(selectSensors);
  const sensorsDetail = useAppSelector(selectSensorsDetail);
  const isSensorsLoading = useAppSelector(selectIsSensorsLoading);
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
      {isSensorsLoading ? (
        <>
          <FullPageLoadingContainer>
            <FullPageLoadingContent>
              <Loading />
            </FullPageLoadingContent>
          </FullPageLoadingContainer>
        </>
      ) : (
        <>
          <HomeContainer>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
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
              themeName={themeName}
            />

            <SettingsFloatingMneu />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  zIndex: 1000,
                }}
              >
                <MapLegend
                  info={{
                    title: "AQICN MAP GUIDE",
                    options: legendOptions,
                  }}
                />
              </div>
            </div>
          </HomeContainer>
        </>
      )}
    </>
  );
};

export default Home;
