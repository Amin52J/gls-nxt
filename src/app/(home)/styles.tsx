import styled, { css } from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const ModalTrigger = styled.button(
  ({ theme }) => css`
    font-weight: 600;
    box-shadow: ${theme.shadows.s};
    background-color: ${theme.colors.primary[100]};
    color: ${theme.colors.primary.contrastText};
    padding: ${theme.spacing * 2}px ${theme.spacing * 3}px;
    border-radius: ${theme.borderRadius.m};
    border-width: 1px;
    border-style: solid;
    border-color: ${theme.colors.primary[60]};
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.primary[80]};
    }

    &:active {
      background-color: ${theme.colors.primary[60]};
    }
  `,
);
