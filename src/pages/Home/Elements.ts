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
