import styled, { keyframes, css } from "styled-components";

export { default } from "./FloatingMenu";

export const FloatingMenuWrapper = styled.div`
  position: relative;
`;

export const FloatingMenuLabel = styled.label`
  background-color: ${({ theme }) => theme.primary};
  min-width: 4.5rem;
  min-height: 4.5rem;
  border-radius: 50%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1005;
  position: relative;
`;

export const FloatingMenuContentsContainer = styled.ul<{ isOpend: boolean }>`
  min-width: 20rem;
  height: auto;
  position: absolute;
  top: -12rem;
  left: 0;
  z-index: -1;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.body};
  border-radius: 0.8rem;
  opacity: 0;
  padding-bottom: 9rem;
  transform: translateY(1.5rem);
  transition: transform 0.4s, opacity 0.2s;
  padding: 0.6rem;
  ${(props) =>
    props.isOpend &&
    css`
      opacity: 1;
      transform: translateY(0rem);
    `}
`;

export const FloatingMenuContentItem = styled.li``;

export const FloatingMenuCheckBox = styled.input`
  display: none;
  &:checked ~ ${FloatingMenuContentsContainer} {
    opacity: 1;
    transform: translateY(0rem);
  }
`;
