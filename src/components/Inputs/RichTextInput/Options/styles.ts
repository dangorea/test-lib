import styled from "styled-components";

export const LayoutWrapper = styled.div`
  position: absolute;
  top: 210px;
  left: 106px;
  display: flex;
  gap: 12px;
  flex-direction: column;
  width: 216px;
  padding: 15px;
  z-index: 100;
  border: 0;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 6px 6px 0 rgba(22, 45, 61, 0.06),
    0 0 18px 0 rgba(22, 45, 61, 0.12);
  font-size: 14px;
  line-height: 18px;
  color: #162d3d;
  background: #fff;

  &::after {
    content: "";
    position: absolute;
    top: -7%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }

  label {
    font-size: 15px;
  }
`;

export const ToolbarBtnWrapper = styled.div`
  border: none;
  background: transparent;
  background: 0 0;
  fill: #577083;
  height: 40px;
  width: 54px;
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 6px;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &.unordered {
    order: 4;
  }

  &.ordered {
    order: 5;
  }

  &.linkOption {
    order: 3;
  }

  &.active {
    g {
      fill: #3899ec;
    }

    path {
      fill: #3899ec;
    }
  }

  &:hover {
    g {
      fill: #3899ec;
    }

    path {
      fill: #3899ec;
    }
  }
`;

export const LinkInputWrapper = styled.div`
  box-sizing: border-box;
  border-radius: 6px;
  position: relative;
  display: flex;
  padding: 0 6px;
  border: solid 1px #c1e4fe;
  background-color: #fff;
  color: #162d3d;

  &:hover {
    background-color: #eaf7ff;
  }
`;

export const LinkInput = styled.input`
  text-overflow: clip;
  padding: 5px 3px 5px 6px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: #162d3d;
  display: block;
  flex: 1 1 auto;
  margin: 0;
  border: 0;
  outline: 0;
  background: 0 0;
  box-shadow: none;
  width: inherit;
  overflow-block: scroll;
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 6px;
`;

export const CancelBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: solid 1px #3899ec;
  background: 0 0;
  color: #3899ec;
  border-radius: 18px;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;

  & svg {
    width: 10px;
    height: 10px;
  }

  &:hover {
    background-color: #3899ec;
    color: #fff;

    & path {
      fill: #fff;
    }
  }
`;

export const AddBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 18px;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #3899ec;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;
  background-color: #3899ec;
  color: #fff;

  & svg {
    width: 12px;
    height: 12px;
  }

  & path {
    fill: #fff !important;
  }

  &:disabled {
    background-color: rgba(22, 45, 61, 0.3);
    border-color: transparent;
    color: #fff;
  }
`;
