import { useEffect, useReducer, useState } from "react";
import { FeatureCollection, StationDetailResponse, Pm252 } from "model";
import { request } from "utils";
const aqicnBaseURL = process.env.REACT_APP_AQICN_API_URL as string;

const aqicnURL = (url: string) => `${aqicnBaseURL}${url}`;

type Props = {
  feature: FeatureCollection;
  detail: any;
};
type Data = {
  data: any;
  isLoading: boolean;
};
enum ActionKind {
  SetData = "set_data",
  SetLoading = "set_loading",
  ResetData = "reset_data",
}

type Action = {
  type: ActionKind;
  payload: Data;
};

const fetchingInitialData: Data = { data: null, isLoading: true };
// const reducerCallBack: Data = (state: Data, action: Action): Data => {
//     const { payload, type } = action
//     console.log(state)
//     switch (action.type) {
//         case "set_data":

//             break;

//         default:
//             break;
//     }
// }
const today = new Date().toJSON().slice(0, 10);
console.log("this is today :: ", today);
const CustomPopup: React.FC<Props> = ({ feature, detail }): JSX.Element => {
  // const [data, dispatch] = useReducer<Data, Action>(reducerCallBack, fetchingInitialData)
  // const { id, name, description } = feature.properties;
  const [data, setData] = useState<StationDetailResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("isLoading is changed!!!", isLoading);
  }, [isLoading]);

  console.log("shit is shit detail ", detail);

  const todayPm25Data: Pm252 | undefined = JSON.parse(
    detail?.forecast
  ).daily?.pm25?.find((item: Pm252) => item.day === today);
  return (
    <div id={`popup-${Math.random}`}>
      <>
        {/* {isLoading ? (
          <>loading ... </>
        ) : todayPm25Data ? ( */}
        <ul>
          <li>name: {detail.name}</li>
          <li>avg: {todayPm25Data?.avg}</li>
          <li>max: {todayPm25Data?.max}</li>
          <li>min: {todayPm25Data?.min}</li>
        </ul>
        {/* ) : (
          <>today data is not valid !</>
        )} */}
      </>
    </div>
  );
};

export default CustomPopup;
