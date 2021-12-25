import { css, createGlobalStyle } from "styled-components";
import { AppTheme } from "model";

export const mapBoxPopup = css`
  .mapboxgl-popup > * {
    background-color: ${({ theme }: { theme: AppTheme }) => {
      return theme.text3;
    }};
  }

  .mapboxgl-popup-content {
    padding: 0;
  }

  .mapboxgl-popup-tip {
    background-color: transparent;
    border-top-color: ${({ theme }: { theme: AppTheme }) =>
      theme.text3}!important;
  }
  .airQuality-popup__header {
    background-color: ${({ theme }: { theme: AppTheme }) => theme.primary};
    font-size: 1.8rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
  }

  .airQuality-popup__content {
    padding: 1rem;
  }

  .airQuality-popup__detail-label {
    background-color: ${({ theme }: { theme: AppTheme }) => theme.primary};
    /* color:${({ theme }: { theme: AppTheme }) => theme.text1}; */
    font-size: 1.4rem;
    padding: 0.1rem 0.2rem;
    margin-right: 0.2rem;
  }

  .airQuality-popup__detail-item {
    font-size: 1.4rem;
    color: ${({ theme }: { theme: AppTheme }) => theme.primary};
    font-weight: 700;
  }
`;
export const MapBoxPopup = createGlobalStyle(mapBoxPopup as any);

export default mapBoxPopup;
