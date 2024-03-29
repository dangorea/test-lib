import styled from "styled-components";

export const EditActionsWrapper = styled.div`
  position: relative;
  z-index: 600;
  left: 10px;
  width: 40px;
  top: 20%;
  display: flex;
  flex-direction: column;
  margin: 0;

  &.my-node-appear {
    opacity: 0;
    left: -10px;
    margin: 0;
  }

  &.my-node-appear-active {
    opacity: 1;
    left: 10px;
    transition: left 0.2s linear, opacity 0.2s linear;
    margin: 0;
  }

  &.my-node-appear-done {
    opacity: 1;
    left: 10px;
    margin: 0;
  }

  &.my-node-exit {
    opacity: 1;
    margin: 0;
  }

  &.my-node-exit-active {
    opacity: 0;
    left: -10px;
    transition: left 0.2s linear, opacity 0.2s linear;
    margin: 0;
  }

  & > * {
    margin-bottom: 15px;
  }
`;
