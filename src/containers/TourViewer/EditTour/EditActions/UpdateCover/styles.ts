import styled from "styled-components";

export const SvgIconHover = styled.div`
  & #cover-icon {
    fill: black;
  }

  &:hover {
    & #cover-icon {
      fill: white;
    }
  }
`;

export const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  color: #3899ec;
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 40px;
  //height: 40px;
  border-radius: 50%;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;

  &:hover {
    color: #fff;
    border-color: transparent;
    background: #4eb7f5;
  }
`;

export const UpdateCoverWrapper = styled.div<{ open: boolean }>`
  border: 0;
  width: max-content;
  padding: 12px 0;
  border-radius: 8px;
  box-shadow: 0 6px 6px 0 rgba(22, 45, 61, 0.06),
    0 0 18px 0 rgba(22, 45, 61, 0.12);
  will-change: opacity;
  font-size: 14px;
  line-height: 18px;
  background: #fff;
  min-width: 144px;
  max-width: 204px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in, all 0.2s ease-out;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent white transparent transparent;
  }
`;

export const PopoverBtn = styled.div`
  margin: 0;
  background: transparent;
  outline: 0;
  border: 0;
  text-align: left;
  padding: 6px 24px 6px 18px;
  width: 100%;
  cursor: pointer;
  color: #162d3d;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;

  &:hover {
    color: #3899ec;
  }
`;
