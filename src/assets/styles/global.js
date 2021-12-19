import { createGlobalStyle } from "styled-components";
import { normalize } from "./normalizer";

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  body {
    background: ${({ theme }) => {
      return theme.body;
    }};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
  html { font-size: 62.5%; }
  .mapboxgl-popup-close-button{
    display:none;
  }

`;
