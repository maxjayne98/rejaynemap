import styled from "styled-components";
import { AppTheme } from "model";

export const MapLegendContainer = styled.div`
  padding: 1rem;
  background-color: ${({ theme }: { theme: AppTheme }) => theme.primary};
  color: ${({ theme }: { theme: AppTheme }) => theme.body};
  border-radius: 0.8rem;
`;

export const MapLegendTitle = styled.div`
  font-size: 1.8rem;
  color: ${({ theme }: { theme: AppTheme }) => theme.text1};
`;

export const MapLegendContent = styled.ul``;

export const MapLegendItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MapLegendItemLabel = styled.div`
  margin-right: 0.6rem;
`;

export const MapLegendTip = styled.span`
  font-size: 1rem;
  color: ${({ theme }: { theme: AppTheme }) => theme.text1};
`;

export const MapLegendName = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }: { theme: AppTheme }) => theme.text1};
  margin-right: 0.4rem;
`;
