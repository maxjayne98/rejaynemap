import styled from "styled-components";
import { devicesMax } from "utils";
export const ToolBoxContainer = styled.div`
  /* position: relative; */
`;
export const MapLegendDesktopContainer = styled.div`
  position: fixed;
  top: 99vh;
  transform: translateY(-100%);
  right: 1rem;
  z-index: 1000;
  @media ${devicesMax.mobileL} {
    right: unset;
    left: 1rem;
  }
`;

export const SettingsFloatingMenuContainer = styled.div`
  position: fixed;
  top: 99vh;
  transform: translateY(-100%);
  left: 1rem;
  z-index: 1000;
  @media ${devicesMax.mobileL} {
    top: 73vh;
  }
`;
