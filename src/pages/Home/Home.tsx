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
import SwitchButton from "components/Common/ToolBox/SwitchButton";
import CustomMap from "components/HomePage/CustomMap";
import MapLegend from "components/HomePage/MapLegend";
import { PM25_LAYER_STOPS } from "utils";
import Loading from "components/Common/Lottie";
import ToolBox from "components/HomePage/ToolBox";

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

  const checkButtonOnChange = useCallback(() => {
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
            <ToolBox
              checkButtonOnChange={checkButtonOnChange}
              legendOptions={legendOptions}
            />
            <CustomMap
              sensors={sensors}
              sensorsDetail={sensorsDetail}
              themeName={themeName}
            />
          </HomeContainer>
        </>
      )}
    </>
  );
};

export default Home;
