import styled from "styled-components";
// import { Dropzone as WixDropzone } from "wix-style-react";

export const UploadBtn = styled.button<{ fullWidth?: boolean }>`
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #3899ec;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;
  height: 36px;
  min-width: 84px;
  border-radius: 18px;
  padding: 0 23px;
  background-color: #3899ec;
  color: #ffffff;
  text-decoration: none;
  user-select: none;
  width: ${({ fullWidth }) => fullWidth && "100%"};

  &:hover {
    background-color: #4eb7f5;
    border-color: #4eb7f5;
    color: #ffffff;
  }
`;

export const Drawer = styled.div<{ open: boolean; width: number }>`
  position: fixed;
  top: 0;
  right: ${({ open, width }) => (open ? 0 : -width)}px;
  height: 100%;
  box-shadow: 0 3px 24px 0 rgba(22, 45, 61, 0.18),
    0 8px 8px 0 rgba(22, 45, 61, 0.12);
  z-index: 3004;
  transition: right 0.4s ease 0s;
  width: ${({ width }) => width}px;

  @media (max-width: 700px) {
    right: ${({ open, width }) => (open ? 0 : -width) * 0.3};
    visibility: ${({ open }) => (!open ? "hidden" : "visible")};
    opacity: ${({ open }) => (!open ? "0" : "1")};
    transition: right 0.4s ease 0s, visibility 0.3s linear, opacity 0.3s linear;
    width: 100%;
  }
`;

export const SidePanel = styled.div<{ width: number }>`
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 12px 24px 24px;
`;

export const HeaderText = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #162d3d;
`;

export const CloseBtn = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 12px;
  border-radius: 18px;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  border: 0 transparent;
  background: none;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;
  cursor: pointer;

  & > svg {
    width: 12px;
    height: 12px;
  }
`;

export const Divider = styled.hr`
  background-color: #dfe5eb;
  min-height: 1px;
  width: 100%;
  margin: 0;
  border: 0;
`;

export const ContentWrapper = styled.div`
  overflow: auto;
  height: 100%;
  flex: 1;
  padding: 24px;
`;
