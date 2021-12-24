import React, { ReactElement } from "react";

import { useAppDispatch } from "redux/hooks";
import { Close, Settings } from "@styled-icons/evaicons-solid";
import FloatingMenu from "components/ToolBox/FloatingMenu";
import { toggleColorPallet, toggleTheme } from "redux/theme/actions";
import RotatingIconButton from "components/ToolBox/RotatingIconButton";
import {
  ColorPalleteItem,
  StylePickerContainer,
  ThemeItem,
} from "components/HomePage/Element";
import {
  dimTheme,
  darkTheme,
  lightTheme,
  greenCollorPallet,
  violetCollorPallet,
  blueCollorPallet,
} from "assets/styles/theme";
interface Props {}

const FloatingMenuIcons = (
  <div style={{ width: "100%", height: "100%", position: "relative" }}>
    <RotatingIconButton>
      <Close />
      <Settings />
    </RotatingIconButton>
  </div>
);

function SettingsFloatingMenu({}: Props): ReactElement {
  const dispatch = useAppDispatch();

  const handleColorPalleteItemOnClick = (event: any) =>
    dispatch(toggleColorPallet(event.target.name));

  const handleThemeItemOnClick = (event: any) =>
    dispatch(toggleTheme(event.target.name));

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          zIndex: 1000,
        }}
      >
        <FloatingMenu icon={FloatingMenuIcons}>
          <label>color pallete !!</label>
          <StylePickerContainer>
            <ColorPalleteItem
              color={greenCollorPallet.primary}
              isSelected={false}
              name="green"
              onClick={handleColorPalleteItemOnClick}
            />
            <ColorPalleteItem
              color={violetCollorPallet.primary}
              isSelected={false}
              name="violet"
              onClick={handleColorPalleteItemOnClick}
            />
            <ColorPalleteItem
              color={blueCollorPallet.primary}
              isSelected={true}
              name="blue"
              onClick={handleColorPalleteItemOnClick}
            />
          </StylePickerContainer>
          <label>theme pallete !!</label>
          <StylePickerContainer>
            <ThemeItem
              bgColor={darkTheme.body}
              onClick={handleThemeItemOnClick}
              isSelected={false}
              name="dark"
            >
              DARK
            </ThemeItem>
            <ThemeItem
              bgColor={dimTheme.body}
              onClick={handleThemeItemOnClick}
              isSelected={true}
              name="light"
            >
              LIGHT
            </ThemeItem>
            <ThemeItem
              bgColor={lightTheme.body}
              onClick={handleThemeItemOnClick}
              isSelected={false}
              name="dim"
            >
              DIM
            </ThemeItem>
          </StylePickerContainer>
        </FloatingMenu>
      </div>
    </div>
  );
}

export default SettingsFloatingMenu;
