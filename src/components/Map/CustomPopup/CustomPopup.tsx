import { FeatureCollection, Pm252 } from "model";

type Props = {
  feature: FeatureCollection;
  detail: any;
};

const today = new Date().toJSON().slice(0, 10);
const CustomPopup: React.FC<Props> = ({ feature, detail }): JSX.Element => {
  const todayPm25Data: Pm252 | undefined = JSON.parse(
    detail?.forecast
  ).daily?.pm25?.find((item: Pm252) => item.day === today);
  return (
    <div>
      <div className="airQuality-popup__header">{detail.name}</div>
      <ul className="airQuality-popup__content">
        <li className="airQuality-popup__item">
          <span className="airQuality-popup__detail-label">Average :</span>
          <span className="airQuality-popup__detail-item">
            {todayPm25Data?.avg}
          </span>
        </li>

        <li className="airQuality-popup__item">
          <span className="airQuality-popup__detail-label">Minimum :</span>
          <span className="airQuality-popup__detail-item">
            {todayPm25Data?.min}
          </span>
        </li>

        <li className="airQuality-popup__item">
          <span className="airQuality-popup__detail-label">Maximum :</span>
          <span className="airQuality-popup__detail-item">
            {todayPm25Data?.max}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default CustomPopup;
