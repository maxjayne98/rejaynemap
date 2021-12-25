import styled from "styled-components";

export const StylePickerContainer = styled.div`
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.text3};
  color: ${({ theme }) => theme.text1};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem;
`;

export const ColorPalleteItem = styled.button<{
  isSelected: boolean;
  color: string;
}>`
  border-radius: 50%;
  border: 0.2rem solid;
  border-color: ${({ isSelected, theme }) =>
    isSelected ? theme.text3 : "transparent"};
  width: 2rem;
  height: 2rem;
  background-color: ${({ color }) => color}; ;
`;

export const ThemeItem = styled.button<{
  isSelected: boolean;
  bgColor: string;
}>`
  border-radius: 0.4rem;
  /* border: 0.2rem solid; */
  /* border-color: ${({ isSelected, theme }) =>
    isSelected ? theme.text3 : "transparent"}; */
  flex: 1;
  background-color: ${({ bgColor }) => bgColor};
  /* height: 1rem; */
  margin: 0 0.3rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;
