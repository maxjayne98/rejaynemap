import styled from "styled-components";

export const HomeContainer = styled.div``;

export const SwitchButtonWrapper = styled.div`
  padding: 0.8rem 0.4rem;
  border-radius: 4rem;
  background-color: ${({ theme }) => theme.body};
  border: ${({ theme }) => `0.2rem solid${theme.primary}`};
  color: ${({ theme }) => theme.primary};
  text-align: center;
`;

export const SwitchButtonWrapperLabel = styled.p`
  text-align: center;
  font-size: 1rem;
  line-height: 1.2rem;
  font-weight: 700;
  &:last-child {
    margin-bottom: 1rem;
  }
`;

export const MapLegendIcon = styled.div<{ color: string }>`
  height: 1.5rem;
  width: 1.5rem;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  border: 1px solid white;
`;

export const FullPageLoadingContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.body};
`;
export const FullPageLoadingContent = styled.div`
  width: 50vw;
  height: 50vw;
`;
