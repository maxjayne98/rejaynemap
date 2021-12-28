import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  selectSensors,
  selectSensorsDetail,
  selectIsSensorsLoading,
  selectFetchSensorsError,
} from "redux/airQualitySensor/selector";
import { selectThemeName } from "redux/theme/selector";
import {
  fetchSensors,
  fetchSensorsDetail,
} from "redux/airQualitySensor/actions";
import {
  HomeContainer,
  MapLegendIcon,
  FullPageLoadingContainer,
  FullPageLoadingContent,
} from "./Elements";
import CustomMap from "components/HomePage/CustomMap";
import { PM25_LAYER_STOPS } from "utils";
import Loading, { ConnectionError } from "components/Common/Lottie";
import ToolBox from "components/HomePage/ToolBox";
import { INITIAL_BOUNDING_BOX } from "utils";

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
  const hasSensorFetchingError = useAppSelector(selectFetchSensorsError);
  const themeName = useAppSelector(selectThemeName);
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
    dispatch(
      fetchSensors(
        INITIAL_BOUNDING_BOX.northWestern,
        INITIAL_BOUNDING_BOX.southEastern
      )
    );
  }, []);

  const checkButtonOnChange = useCallback(() => {
    setCheck((check) => !check);
  }, [setCheck]);

  return (
    <>
      {hasSensorFetchingError ? (
        <>
          <FullPageLoadingContainer>
            <FullPageLoadingContent>
              <ConnectionError />
            </FullPageLoadingContent>
          </FullPageLoadingContainer>
        </>
      ) : isSensorsLoading ? (
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
