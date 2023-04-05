import styled from "styled-components";

export const ActionsSidebarContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  //height: 80%;
`;

export const ActionsSidebarBottomBtns = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > button {
    margin-left: 15px;
  }
`;

export const DeleteWrapper = styled.div`
  flex: 1;
`;

export const DeleteBtn = styled.button`
  background-color: #ee5951;
  border: 1px solid #ee5951;
  color: #fff;
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
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f66;
    border-color: #f66;
    color: #fff;
  }
`;

export const CancelBtn = styled.button`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #fff;
  margin-left: 15px;
  white-space: nowrap;
  background-color: transparent;
  text-decoration: none;
  border: 0 transparent;
  border-radius: 2px;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;
  outline: 0;
  padding: 0;
  height: 24px;
  user-select: none;
`;

export const SaveBtn = styled.button`
  margin-left: 15px;
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

  &:hover {
    background-color: #4eb7f5;
    border-color: #4eb7f5;
    color: #ffffff;
  }
`;
