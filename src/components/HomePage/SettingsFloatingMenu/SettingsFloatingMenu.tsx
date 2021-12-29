import React, { ReactElement } from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Close, Settings } from "@styled-icons/evaicons-solid";
import FloatingMenu from "components/Common/ToolBox/FloatingMenu";
import { toggleColorPallet, toggleTheme } from "redux/theme/actions";
import RotatingIconButton from "components/Common/ToolBox/RotatingIconButton";
import {
  ColorPalleteItem,
  StylePickerContainer,
  ThemeItem,
  GroupLabel,
} from "components/HomePage/SettingsFloatingMenu/Element";
import {
  dimTheme,
  darkTheme,
  lightTheme,
  greenCollorPallet,
  violetCollorPallet,
  blueCollorPallet,
} from "assets/styles/theme";
import { selectPalletName, selectThemeName } from "redux/theme/selector";
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
  const theme = useAppSelector(selectThemeName);
  const color = useAppSelector(selectPalletName);
  const handleColorPalleteItemOnClick = (event: any) =>
    dispatch(toggleColorPallet(event.target.name));

  const handleThemeItemOnClick = (event: any) =>
    dispatch(toggleTheme(event.target.name));

  return (
    <>
      <FloatingMenu icon={FloatingMenuIcons}>
        <GroupLabel>Color</GroupLabel>
        <StylePickerContainer>
          <ColorPalleteItem
            color={greenCollorPallet.primary}
            isSelected={color === "green"}
            name="green"
            onClick={handleColorPalleteItemOnClick}
          />
          <ColorPalleteItem
            color={violetCollorPallet.primary}
            isSelected={color === "violet"}
            name="violet"
            onClick={handleColorPalleteItemOnClick}
          />
          <ColorPalleteItem
            color={blueCollorPallet.primary}
            isSelected={color === "blue"}
            name="blue"
            onClick={handleColorPalleteItemOnClick}
          />
        </StylePickerContainer>
        <GroupLabel>Theme</GroupLabel>
        <StylePickerContainer>
          <ThemeItem
            bgColor={darkTheme.body}
            onClick={handleThemeItemOnClick}
            isSelected={theme === "dark"}
            name="dark"
          ></ThemeItem>
          <ThemeItem
            bgColor={dimTheme.body}
            onClick={handleThemeItemOnClick}
            isSelected={theme === "dim"}
            name="dim"
          ></ThemeItem>
          <ThemeItem
            bgColor={lightTheme.body}
            onClick={handleThemeItemOnClick}
            isSelected={theme === "light"}
            name="light"
          ></ThemeItem>
        </StylePickerContainer>
      </FloatingMenu>
    </>
  );
}

export default SettingsFloatingMenu;
