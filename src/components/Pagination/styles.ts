import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
`;

export const PaginationItem = styled.li`
  padding: 0 12px;
  height: 32px;
  text-align: center;
  margin: auto 4px;
  color: rgb(255, 255, 255);
  display: flex;
  box-sizing: border-box;
  align-items: center;
  letter-spacing: 0.01071em;
  border-radius: 16px;
  line-height: 1.43;
  font-size: 13px;
  min-width: 32px;

  &:hover {
    background-color: #4eb7f5;
    cursor: pointer;
  }

  &.selected {
    background-color: #3899ec;
  }

  &.disabled {
    pointer-events: none;

    &:hover {
      background-color: transparent;
      cursor: default;
    }
  }
`;

export const Arrow = styled.div`
  &::before {
    position: relative;
    content: "";
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    border-right: 0.12em solid rgba(255, 255, 255, 0.87);
    border-top: 0.12em solid rgba(255, 255, 255, 0.87);
  }

  &.left {
    transform: rotate(-135deg) translate(-50%);
  }

  &.right {
    transform: rotate(45deg);
  }
`;
