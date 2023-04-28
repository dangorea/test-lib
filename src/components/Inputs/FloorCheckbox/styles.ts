import styled, { keyframes } from "styled-components";

export const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

export const popIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.5) ;
  }
  to {
    opacity: 1;
    transform: scale(1) ;
  }
`;

export const Label = styled.label`
  display: flex;
  position: relative;
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  align-items: center;
  letter-spacing: 0.2px;
  color: #aaaaaa;
  margin: -6px 0 0 0;
`;

export const Indicator = styled.div`
  border: 1px solid #aaa;
  border-radius: 1em;
  width: 1.2em;
  height: 1.2em;
  position: absolute;
  top: 0;

  ${Label}:hover & {
    background: #3f3f3f;
  }

  &::after {
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: flex;
    content: "\\2713";
    animation-name: ${popIn};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    left: 2px;
  }

  ${Input}:disabled + & {
    pointer-events: none;
    opacity: 0.6;
    background: #e6e6e6;
  }
`;

export const LabelText = styled.div`
  padding-left: 26px;
`;
