import React, { ReactElement } from "react";
import {
  MapLegendContainer,
  MapLegendTitle,
  MapLegendContent,
  MapLegendItem,
  MapLegendTip,
  MapLegendName,
  MapLegendItemLabel,
} from "./MapLegendElements";
interface LegendInfo {
  title: string;

  options: Array<{ name: string; tip: string; element: React.ReactNode }>;
}
interface Props {
  info: LegendInfo;
}

const MapLegend: React.FC<Props> = ({ info }) => {
  const items = info.options.map(({ name, tip, element }) => (
    <MapLegendItem>
      <MapLegendItemLabel>
        <MapLegendName>{name}</MapLegendName>
        <MapLegendTip>{tip}</MapLegendTip>
      </MapLegendItemLabel>
      {element}
    </MapLegendItem>
  ));

  return (
    <MapLegendContainer>
      <MapLegendTitle>{info.title}</MapLegendTitle>
      <MapLegendContent>{items}</MapLegendContent>
    </MapLegendContainer>
  );
};

export default MapLegend;
