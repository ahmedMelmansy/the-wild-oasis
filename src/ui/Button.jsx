import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    font-weight: 600;
  `,

  medium: css`
    font-size: 1.4rem;
    padding: 1rem 1.6rem;
    font-weight: 500;
  `,

  large: css`
    font-size: 1.6rem;
    padding: 1.6rem 6rem;
    font-weight: 600;
    width: 100%;
  `,
};

const variations = {
  primary: css`
    color: #fff;
    background-color: var(--color-brand-600);

    &:hover:not(:disabled) {
      background-color: var(--color-brand-700);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,

  secondary: css`
    color: var(--color-grey-700);
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover:not(:disabled) {
      background-color: var(--color-grey-100);
    }
  `,

  danger: css`
    color: #ffffff;
    background-color: var(--color-red-700);

    &:hover:not(:disabled) {
      background-color: var(--color-red-800);
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  transition: all 0.2s ease;

  /* focus accessibility */
  &:focus-visible {
    outline: 3px solid var(--color-brand-200);
    outline-offset: 2px;
  }

  /* disabled state */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  ${props => sizes[props.size]}
  ${props => variations[props.variation]}
  
`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
};

export default Button;