import SwitchButton from "components/Common/ToolBox/SwitchButton";
import {
  SwitchButtonWrapper,
  SwitchButtonWrapperLabel,
} from "pages/Home/Elements";
import SettingsFloatingMenu from "../SettingsFloatingMenu/SettingsFloatingMenu";
import React, { ReactElement } from "react";
import {
  ToolBoxContainer,
  MapLegendDesktopContainer,
  SettingsFloatingMenuContainer,
} from "./ToolBoxElements";
import MapLegend from "../MapLegend";
interface Props {
  checkButtonOnChange: () => void;
  legendOptions: any;
}

function ToolBox({ checkButtonOnChange, legendOptions }: Props): ReactElement {
  return (
    <ToolBoxContainer>
      <SettingsFloatingMenuContainer>
        <SettingsFloatingMenu />
      </SettingsFloatingMenuContainer>
      <MapLegendDesktopContainer>
        <MapLegend
          info={{
            title: "AQICN MAP GUIDE",
            options: legendOptions,
          }}
        />
      </MapLegendDesktopContainer>

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
          <SwitchButton onClick={checkButtonOnChange} />
        </SwitchButtonWrapper>
      </div>
    </ToolBoxContainer>
  );
}

export default ToolBox;
