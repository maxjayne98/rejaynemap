import { useEffect, useReducer, useState } from "react";
import { FeatureCollection } from "model";
import { request } from 'utils'

const aqicnBaseURL = process.env.REACT_APP_AQICN_API_URL as string

const aqicnURL = (url: string) => `${aqicnBaseURL}${url}`

type Props = {
    feature: FeatureCollection
};
type Data = {
    data: any,
    isLoading: boolean
}
enum ActionKind {
    SetData = 'set_data',
    SetLoading = 'set_loading',
    ResetData = 'reset_data'
}

type Action = {
    type: ActionKind,
    payload: Data
}

const fetchingInitialData: Data = { data: null, isLoading: true }
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
const CustomPopup: React.FC<Props> = ({ feature }): JSX.Element => {
    // const [data, dispatch] = useReducer<Data, Action>(reducerCallBack, fetchingInitialData)
    // const { id, name, description } = feature.properties;
    const [data, setData] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchStationDetails = async () => {
        try {
            setIsLoading(true)
            const { data } = await request.get(aqicnURL("/map/search"))
            console.log("search:: ", data.data)
            setTimeout(() => {
                setData(data.data)
                setIsLoading(false)
            }, 2000)
        } catch (error) {
            setIsLoading(false)
            console.log("This is error :: ", error)
        }
    }
    const [sample, setSample] = useState("1111")
    useEffect(() => {
        fetchStationDetails()
        setTimeout(() => {
            setSample("2222")
        }, 2000)
    }, [])

    useEffect(() => {
        console.log("isLoading is changed!!!", isLoading)
    }, [isLoading])


    return (
        <div id={`popup-${Math.random}`}>
            {/* <h3>{name}</h3> */}
            {/* {description} */}
            {isLoading ? <>this is loading !!</> : <>{data?.iaqi?.pm25?.v}</>}
        </div>
    );
};

export default CustomPopup