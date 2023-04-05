import styled from "styled-components";
// import { Heading } from "wix-style-react";

export const SidebarWrapper = styled.div<{ open: boolean }>`
  transform: translateX(${({ open }) => (open ? 0 : "540px")});
  opacity: ${({ open }) => (open ? 1 : 0)};
  width: 540px;
  max-width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 3004;
  top: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 24px;
  background: linear-gradient(
    to top,
    black 0%,
    black 70px,
    rgba(7, 7, 7, 0.8) 47%,
    rgba(19, 19, 19, 0.8) 100%
  );
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease-in, opacity 0.2s ease-in;
  color: #fff;
`;

export const CloseBtn = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
  color: gray;
  width: 30px;
  height: 30px;
  border: 1px solid gray;
  border-radius: 50%;
  transition: all 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: white;
    border-color: white;
  }

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

export const SidebarTitle = styled.title`
  font-family: "Lato", sans-serif;
  display: flex;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 52px;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

export const SidebarActionsWrapper = styled.div`
  margin-top: 20px;
`;

export const SidebarActions = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

export const SelectedCount = styled.span`
  color: #0081ff;
  background-color: #fff;
  display: inline-block;
  height: 30px;
  min-width: 30px;
  border-radius: 14px;
  text-align: center;
  line-height: 30px;
  margin-left: 10px;
`;

export const CancelBtn = styled.button`
  display: flex;
  border: 1px solid #fff;
  background-color: #fff;
  color: #3899ec;
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
  border-radius: 18px;
  padding: 0 23px;
  text-decoration: none;
  user-select: none;

  font-weight: 400;
  font-family: "He  lvetica Neue", sans-serif;

  &:hover {
    color: #fff;
    border-color: transparent;
    background-color: #4eb7f5;
  }
`;

export const AddSelectedBtn = styled.button<{ disabled: boolean }>`
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  cursor: default;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
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
  text-decoration: none;
  user-select: none;

  color: ${({ disabled }) => (disabled ? "rgb(164, 159, 163)" : "#fff")};
  background-color: ${({ disabled }) =>
    disabled ? "rgba(255, 255, 255, 0.3)" : "#3899ec"};
  border: ${({ disabled }) => (disabled ? "transparent" : "1px solid #3899ec")};

  &:hover {
    background-color: #4eb7f5;
    border: 1px solid #4eb7f5;
    color: #fff;
  }
`;
