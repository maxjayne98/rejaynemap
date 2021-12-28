import styled, { keyframes } from "styled-components";

const redAnimation = keyframes`
0% {
    height: 25px;
    width: 0;
    border-width: 3px;
  }
  55% {
    height: 8px;
    width: 22px;
    border-width: 6px;
  }
  70% {
    height: 10px;
    width: 10px;
    border-width: 6px;
  }
  85% {
    height: 10px;
    width: 20px;
    border-width: 6px;
  }
  100% {
    height: 15px;
    width: 15px;
    border-width: 6px;
  }
`;

const greenAnimation = keyframes`
0% {
    height: 15px;
    width: 15px;
    border-width: 6px;
  }
  25%,
  55%,
  85% {
    height: 25px;
    width: 3px;
    border-width: 3px;
  }
  40%,
  70%,
  100% {
    height: 25px;
    width: 0;
    border-width: 3px;
  }
`;

export const Toggle = styled.div`
  height: 17px;
  width: 17px;
`;

export const ToggleWrapper = styled.label`
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  min-width: 5rem;
  min-height: 5rem;
  height: 100%;
  border-radius: 50%;
  border: 0.2rem solid white;

  &:active {
    box-shadow: 0 1.5rem 1.5rem 0 rgba(254, 69, 81, 0.5);
  }

  &:active ${Toggle} {
    height: 1.7rem;
    width: 1.7rem;
  }
  ${Toggle} {
    transition: all 0.2s ease-in-out;
    height: 1.5rem;
    width: 1rem.5rem;
    background-color: transparent;
    border: 0.6rem solid #fff;
    border-radius: 50%;
    cursor: pointer;
    animation: ${redAnimation} 0.7s linear forwards;
    padding: 0;
    box-sizing: content-box;
  }
`;

export const SimpleInput = styled.input`
  display: none;
  &:checked + ${ToggleWrapper} {
    background-color: #48e98a;
    border: 0.2rem solid #48e98a;
    box-shadow: 0 2rem 2rem 0 rgba(72, 233, 138, 0.3);
  }
  &:checked + ${ToggleWrapper}:active {
    box-shadow: 0 1.5rem 1.5rem 0 rgba(72, 233, 138, 0.5);
  }
  &:checked + ${ToggleWrapper} ${Toggle} {
    width: 0;
    background-color: #fff;
    border-color: transparent;
    border-radius: 3rem;
    animation: ${greenAnimation} 0.7s linear forwards !important;
  }
`;
