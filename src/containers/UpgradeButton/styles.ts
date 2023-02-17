import styled from "styled-components";

export const PremiumBtn = styled.div`
  display: flex;
  background-color: #aa4dc8;
  border: 1px solid #aa4dc8;
  color: #fff;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;
  height: 36px;
  min-width: 84px;
  border-radius: var(--wsr-button-border-radius, 18px);
  padding: 0 23px;
  text-decoration: none;
  user-select: none;
  font-weight: 400;

  &:hover {
    background-color: #cd68ed;
    border-color: #cd68ed;
    color: #fff;
  }
`;
