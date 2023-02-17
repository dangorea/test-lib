import styled from "styled-components";

export const TooltipWrapper = styled.div`
  position: relative;
  //display: inline-block;
  margin: 0;
  padding: 0;
  max-width: 200px;
  height: inherit;
  font-weight: 400;
  font-size: 28px;
  line-height: 36px;

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
    width: max-content;
    max-width: 200px;
  }
`;

export const TooltipText = styled.div<{ theme?: string }>`
  visibility: hidden;
  position: absolute;
  border-radius: 8px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  border: 0;
  box-sizing: border-box;
  padding: 12px 24px;
  color: #fff;
  background: ${({ theme }) => theme};
  margin: 0;
  text-align: start;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: 0;

  &.tooltip-right {
    top: -5px;
    left: 110%;
  }

  &.tooltip-right::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent ${({ theme }) => theme} transparent transparent;
  }

  &.tooltip-bottom {
    top: 135%;
    left: 50%;
    margin-left: -60px;
  }

  &.tooltip-bottom::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 11px;
    border-style: solid;
    border-color: transparent transparent ${({ theme }) => theme} transparent;
  }

  &.tooltip-top {
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
  }

  &.tooltip-top::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme} transparent transparent transparent;
  }

  &.tooltip-left {
    top: -5px;
    bottom: auto;
    right: 128%;
  }

  &.tooltip-left::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent ${({ theme }) => theme};
  }
`;

export const ChildrenWrapper = styled.div`
  font-weight: 400;
  font-size: 28px;
  line-height: 36px;
`;

// export const Arrow = styled.div`
//   position: absolute;
//   left: 48%;
//   top: -10px;
//   border-left: 8px solid transparent;
//   border-right: 8px solid transparent;
//   border-bottom: 10px solid #fff;
//   z-index: 1;
// `;
