import styled from "styled-components";

export const IconSelectWrapper = styled.div`
  & > * {
    user-select: none;
  }
`;

export const Label = styled.div`
  flex: 1 0 auto;
  max-width: 100%;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #ffffff;
  margin-top: 10px;
`;

export const IconModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CurrentIconWrapper = styled.div`
  display: flex;
  width: 70px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.4s;
`;

export const CurrentIcon = styled.img`
  width: 50px;
  height: 50px;
`;

export const RotateChevron = styled.div<{ open: boolean }>`
  rotate: ${({ open }) => (open ? "180deg" : "0")};
  transition: 0.2s rotate;
`;

export const UploadBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

export const InfoIconWrapper = styled.div`
  margin: 10px 0 0 0;
`;

export const DropDownListContainer = styled.div<{ open: boolean }>`
  opacity: ${({ open }) => (open ? 1 : 0)};
  display: ${({ open }) => (open ? "block" : "none")};
  position: relative;
  margin-top: 5px;

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 4.7%;
    margin-left: -5px;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }
`;

export const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  background: #000000;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
`;

export const IconDeleteElement = styled.div`
  position: absolute;
  z-index: 1;
  width: 20px;
  height: 20px;
  opacity: 1;
  display: flex;
  justify-content: center;
  left: 30px;
  top: 0;
`;

export const UnlinkBtn = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #a41e22;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all ease-in-out;

  &:hover {
    box-shadow: 0 0 5px 3px rgba(255, 255, 255, 0.4);
  }
`;

export const IconItem = styled.img<{ selected: boolean }>`
  height: 50px;
  width: 50px;
  cursor: pointer;
  position: relative;

  background-color: ${({ selected }) => (selected ? "#0081ff" : "none")};
`;

export const UploadIconBtn = styled.button`
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

export const LoadingSpinner = styled.span`
  width: 28px;
  height: 28px;
  border: 4px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin: 4px 36px;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
