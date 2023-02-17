import styled from "styled-components";

export const EditActionsWrapper = styled.div`
  z-index: 600;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;

  & > * {
    margin-left: 10px;
  }
`;

export const Button = styled.div`
  display: flex;
  border-color: #fff;
  background-color: #fff;
  color: #4eb7f5;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  height: 36px;
  min-width: 84px;
  border-radius: var(--wsr-button-border-radius, 18px);
  padding: 0 23px;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;
  outline: 0;
  user-select: none;
  font-weight: 400;

  &:hover {
    background-color: #eaf7ff;
    color: #3899ec;
    border-color: #eaf7ff;
  }
`;
