import styled, { css } from "styled-components";

export const ModalContainer = styled.div(
  ({ theme }) => css`
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.overlay};
    font-weight: bold;
  `,
);

export const ModalContent = styled.div(
  ({ theme }) => css`
    width: 80%;
    height: 90%;
    position: relative;
    display: flex;
    flex-direction: column;
    border: 2px solid ${theme.colors.backgroundComplementary};
    border-radius: ${theme.borderRadius.l};
    box-shadow: ${theme.shadows.m};
    background-color: ${theme.colors.background};

    @media screen and (max-width: ${theme.breakpoints.tablet - 1}px) {
      width: 100%;
      height: 100%;
    }
  `,
);

export const ModalHeader = styled.div(
  ({ theme }) => css`
    padding: ${theme.spacing}px ${theme.spacing * 2}px ${theme.spacing}px
      ${theme.spacing * 3}px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
);

export const ModalCrossButton = styled.button(
  ({ theme }) => css`
    padding: 0;
    margin: 0;
    background: transparent;
    border: 0;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${theme.spacing * 5}px;
    height: ${theme.spacing * 5}px;
    border-radius: 50%;
    color: ${theme.colors.text};

    &:hover {
      background: ${theme.colors.overlay};
    }
  `,
);

export const ModalBody = styled.div(
  ({ theme }) => css`
    flex-grow: 1;
    border-top: 2px solid ${theme.colors.backgroundComplementary};
    padding: ${theme.spacing * 2}px ${theme.spacing * 4}px
      ${theme.spacing * 2}px ${theme.spacing * 3}px;
    overflow-y: auto;
  `,
);

export const ModalFooter = styled.div(
  ({ theme }) => css`
    border-top: 2px solid ${theme.colors.backgroundComplementary};
    padding: ${theme.spacing}px ${theme.spacing * 3}px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacing * 2}px;
  `,
);

export const ModalCloseButton = styled.button<{ $isPrimary?: boolean }>(
  ({ theme, $isPrimary }) => css`
    box-shadow: ${theme.shadows.m};
    background-color: ${theme.colors[
      $isPrimary ? "primary" : "secondary"
    ][100]};
    color: ${theme.colors[$isPrimary ? "primary" : "secondary"].contrastText};
    height: ${theme.spacing * 5}px;
    padding: 0 ${theme.spacing * 3}px;
    border-radius: ${theme.borderRadius.m};
    border: 1px solid ${theme.colors[$isPrimary ? "primary" : "secondary"][60]};
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background: ${theme.colors[$isPrimary ? "primary" : "secondary"][80]};
    }

    &:active {
      background: ${theme.colors[$isPrimary ? "primary" : "secondary"][60]};
    }
  `,
);

export const ModalHeaderTitle = styled.h3`
  margin: 0;
`;
