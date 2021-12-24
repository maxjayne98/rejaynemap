import styled, { keyframes } from "styled-components";

export const IconButton = styled.button`
  min-height: 4.5rem;
  min-width: 4.5rem;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0px;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  background: transparent;
  border: none;
`;

export const Icon = styled.div<{ isInitial: boolean; isCurrent: boolean }>`
  position: absolute;
  top: 0px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-fill-mode: both;
  color: ${({ theme }) => theme.text1};
  animation-duration: ${(props) => (props.isInitial ? 0 : 400)}ms;
  animation-delay: ${(props) => (props.isCurrent ? 0 : 200)}ms;
  animation-name: ${(props) => (props.isCurrent ? riseIn : riseOut)};
`;

export const riseIn = keyframes`
  from {
  transform: scale(1);
}
to {
  transform: scale(0);
}
`;

export const riseOut = keyframes`
from {
  transform: scale(0);
}
to {
  transform: scale(1);
}
`;
