import styled from "styled-components";
import { devicesMax } from "utils";
export const ToolBoxContainer = styled.div`
  /* position: relative; */
`;
export const MapLegendDesktopContainer = styled.div`
  position: fixed;
  bottom: -19rem;
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
  bottom: -5rem;
  transform: translateY(-100%);
  left: 1rem;
  z-index: 1000;
  @media ${devicesMax.mobileL} {
    bottom: 15rem;
  }
`;
