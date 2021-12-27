import SwitchButton from "components/ToolBox/SwitchButton";
import {
  SwitchButtonWrapper,
  SwitchButtonWrapperLabel,
} from "pages/Home/Elements";
import SettingsFloatingMenu from "../SettingsFloatingMenu/SettingsFloatingMenu";
import React, { ReactElement } from "react";
import { ToolBoxContainer } from "./ToolBoxElements";
import MapLegend from "../MapLegend";
interface Props {
  checkButtonOnChange: () => void;
  legendOptions: any;
}

function ToolBox({ checkButtonOnChange, legendOptions }: Props): ReactElement {
  return (
    <ToolBoxContainer>
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
      <div
        style={{
          position: "absolute",
          bottom: "-84rem",
          transform: "translateY(-100%)",
          left: "1rem",
          zIndex: 1000,
        }}
      >
        <SettingsFloatingMenu />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "-124vh",
          transform: "translateY(-100%)",
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
    </ToolBoxContainer>
  );
}

export default ToolBox;
