import { FeatureCollection } from "../../../model";

type Props = {
    feature: FeatureCollection
};


const CustomPopup: React.FC<Props> = ({ feature }): JSX.Element => {
    // const { id, name, description } = feature.properties;
    console.log("this is feature :: ", feature)
    return (
        <div id={`popup-${Math.random}`}>
            {/* <h3>{name}</h3> */}
            {/* {description} */}
            salam
        </div>
    );
};

export default CustomPopup