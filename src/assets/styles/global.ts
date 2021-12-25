import { createGlobalStyle } from "styled-components";
import { AppTheme } from "model";
import { normalize } from "./normalizer";
import mapBoxPopup from "assets/styles/mapBox/popup";

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  ${mapBoxPopup}

  body {
    background: ${({ theme }: { theme: AppTheme }) => {
      return theme.body;
    }};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
  html { font-size: 62.5%; }
  
  .mapboxgl-ctrl-logo{
    display:none!important;
    background-image:none!important;
  }

`;
